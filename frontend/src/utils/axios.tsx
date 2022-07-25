import axios from "axios";

const DOMAIN = "http://localhost:8080";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request : any = (method: any, url: any, data: any) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .then((res) => console.log('hi'))
    .catch((err) => console.log(err));
};