import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: 'https://cs-build-1.herokuapp.com/',
        headers: {
            Authorization: "Token 654a676c384a277c9f30f138311543a92124d9e4"
        }
    });
};

export default axiosWithAuth;