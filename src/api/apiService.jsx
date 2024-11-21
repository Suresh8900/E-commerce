import axiosInstance from "./AxiosInstance";



export const postApi = async (endpoint, payLoad) => {

  try {
 
    let token = localStorage.getItem("token");
    console.log('token in API:', token);
    let newToken = token?token.replace(/['"]+/g, ''):'';
    const response = await axiosInstance.post(endpoint, payLoad,  {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': `Bearer ${newToken}` 
      }});
      
    console.log('Response in API:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error in API:', error);
    throw error;
  }
};
