import axios from "axios";

const api_url = "https://jsonplaceholder.typicode.com/users";

export const getUser=()=>{
   return axios.get(api_url);
};

export const createUser=(user)=>{
return axios.post(api_url,user);
};

export const editUser=(id,user)=>{
    return axios.put(`${api_url}/${id}`,user);
};

export const deleteUser=(id)=>{
    return axios.delete(`${api_url}/${id}`);
};