import axios from "axios";
import {api} from './App'

const checkToken = async () => {
  try{
  const token = localStorage.getItem('authToken')

      const response = await axios.get(`${api}/api/users/verifyToken`, {
        headers: {
          authorization: token,
        },
      });
      return response.status
     
    } catch (error) {
   
      console.error("Token validation failed:", error);
      return error.response.status
    }
  

};

export default checkToken;
