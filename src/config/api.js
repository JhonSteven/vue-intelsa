import axios from 'axios';

export const url = 'http://localhost:8000';

if (window.localStorage.getItem("access_token")) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("access_token");
}
axios.defaults.params = {};

const API = axios.create({
    baseURL: url + '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

API.interceptors.response.use(function(response) {
        if (response.data.error) {
            if (response.data.validations) {
                alert('Hay un error en los datos');
            }
        }
        if (response.data.success && response.data.message) {
            alert(response.data.message);
        }
        return Promise.resolve(response);
    },
    function(error) {
        if (error.response.status != 401) {
            if (error.response.data.error) {
                if (error.response.data.validations) {
                    alert('Hay un error en los datos');
                } else {
                    alert(error.response.data.message);
                }
            }
        }
        return Promise.reject(error);
    });

export default API;