// axios is a XMLHttpRequest
import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create();
// Alter defaults after instance has been created
const token = localStorage.getItem("jwtToken");
// place the token in the header so that when the server calls the passport, the fromAuthHeaderAsBearerToken() can get the token. header can be found in developer tools, network, Headers.
instance.defaults.headers.common['Authorization'] = token;

export default instance;
