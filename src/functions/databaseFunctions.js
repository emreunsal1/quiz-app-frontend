import axios from 'axios'

const instance = axios.create({
  baseURL:"http://localhost:3001"
})

export const userLoginController = async (username,password)=>{
  
  try {
    const response = await instance.post('/auth/login',{
      username:username,
      password:password
    });
    return response.data;
  } catch (error) {
    return "User Not Found";
  }
}