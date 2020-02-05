import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: 'https://chronotrigger-remake.herokuapp.com/',
        headers: {
            // Authorization: "Token fd80ff4bdfaced495a7991320427a82b98b3a98b"
            Authorization: "Token 2a184fd0859a03d6f2d24303413a640796645905"
        }
    });
};

export default axiosWithAuth;