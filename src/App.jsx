import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SignIn from './pages/login';
import SignUp from './pages/register';
import Layout from './pages/Layout';
import UserTitle from './pages/UserTitle';
import CircularColor from './components/CircularProgress';
import checkToken from './verifyToken';
import UpdateProfile from './pages/UpdateProfile';
import ImageUploader from './pages/ImageUploader';
import CurrentProfile from './components/CurrentProfile';
import {useLocation} from 'react-router-dom';
import cloudinary from 'cloudinary-core';
import Navigating from './pages/navigation';
import { Dashboard } from "./pages/Dashboard";
import ProjectsApp from 'project_app/App'
import CommunicationApp from 'Communication_app/App'

export const cl = new cloudinary.Cloudinary({ cloud_name: 'megobb' });
export const api = import.meta.env.VITE_API_URL
console.log(api)


const App = () => {
  

  console.log('start....')
  
  
  const navigateTo = useNavigate();
  const location = useLocation();
  const [reload, setReload] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const authAndNavigate = async () => {
    const response = await checkToken();
    if (response === 200 && (window.location.pathname === '/login' || window.location.pathname === '/register')) navigateTo('/dashboard');
    setIsLoaded(true);
  };

  useEffect(() => {
    setReload(prev => prev+1); 
    
     authAndNavigate();

    const axiosInterceptorRequest = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const axiosInterceptorResponse = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401 && !['/register', '/', '/userTitle', '/login'].includes(window.location.pathname)) {
          setTimeout(() => {
            console.log('You are not authorized');
            navigateTo('/');
          }, 1000);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(axiosInterceptorRequest);
      axios.interceptors.response.eject(axiosInterceptorResponse);
    };
  }, [navigateTo, location]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {!isLoaded ? (
          <Route path="/*" element={<CircularColor />} />
        ) : (
          <>
            <Route path="/imageLoader" element={<ImageUploader />} />
            <Route path="/userTitle" element={<UserTitle />} />
            <Route path="/" element={<Navigating />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path='/currentProfile' element={<CurrentProfile />} />
            <Route path='/updateProfile' element={<UpdateProfile />} />
            <Route path="/dashboard" element={<Layout component={<Dashboard />} />} />
            <Route path="/messages/*" element={<Layout component={<CommunicationApp />} />} />
            <Route path="/Projects/*" element={<Layout component={<ProjectsApp />} />} />
          </>
        )}
      </Routes>  
    </ThemeProvider>
  );
};

export default App;
