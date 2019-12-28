import axios from "axios";

let instance = axios.create({ timeout: 30000 });

instance.interceptors.response.use(
  response => {
    let { data } = response;
    if (data.success) {
        return data;
    }
    if(data.data == null) {
        throw data.message;
    } else {
        throw data;
    }
  },
  error => {
    throw error; 
  }
);

export default instance;
