import axios from "axios";

const checkToken = async () => {
  try{
  // localStorage.removeItem('authToken')
  const token = localStorage.getItem('authToken')

      const response = await axios.get(`http://localhost:5000/api/users/verifyToken`, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      return response.status
     
    } catch (error) {
   
      console.error("Token validation failed:", error);
      return error.response.status
    }
  

};

export default checkToken;
