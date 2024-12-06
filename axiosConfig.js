import axios from "axios";

// Set default settings for axios
axios.defaults.withCredentials = true;

// Optionally, set the base URL for all requests
axios.defaults.baseURL = "https://family-tree-backend-om.onrender.com";

// Export axios instance for use in other parts of your application
export default axios;
