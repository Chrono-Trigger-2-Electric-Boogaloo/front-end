import axios from 'axios';

const axiosWithAuth =()=>{
    const key = localStorage.getItem('key');

    return axios.create({
        baseURL: 'https://lambda-mud-test.herokuapp.com/',
        headers:{
            Authorization: key,
        }
    })
}

export default axiosWithAuth;