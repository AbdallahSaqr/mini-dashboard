import axios from "axios";

const api = axios.create({ 
    baseURL: "https://jsonplaceholder.typicode.com" 
});

// API call to fetch Posts
export const getPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// API call to fetch Users
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// API call to fetch todos
export const getTodos = async () => {
    try {
        const response = await api.get("/todos");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
}


export default api;