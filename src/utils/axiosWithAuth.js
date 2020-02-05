import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    console.log('token', token)

    return axios.create({
        baseURL: 'https://cs-bw1-be.herokuapp.com/',
        headers: {
            Authorization: "Token 3a314328b30af2e44eab98ff7b45d1c4e79689d7"
        }
    });
};

export default axiosWithAuth;