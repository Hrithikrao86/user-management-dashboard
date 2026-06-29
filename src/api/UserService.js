import axios from "axios";



const api_url = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const getUser=()=>{
   return axios.get(api_url);
};

// Create a new user
export const createUser=(user)=>{
return axios.post(api_url,user);
};

// Update existing user
export const editUser=(id,user)=>{
    return axios.put(`${api_url}/${id}`,user);
};

// Delete a user
export const deleteUser=(id)=>{
    return axios.delete(`${api_url}/${id}`);
};