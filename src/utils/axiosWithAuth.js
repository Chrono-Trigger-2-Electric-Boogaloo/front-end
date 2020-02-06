import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: 'http://chronotrigger-remake.herokuapp.com/',
        headers: {
            // Authorization: "Token fd80ff4bdfaced495a7991320427a82b98b3a98b"
            Authorization: `Token ${token}`
        }
    });
};

export default axiosWithAuth;