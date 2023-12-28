const token = localStorage.getItem("authToken");
const apiProject = import.meta.env.VITE_SERVER_URL;
const { headers } = [
  {
    'Authorization': 'Happy',
    'Content-Type': 'application/json; charset=utf-8',
  }
];


export {token, apiProject, headers};