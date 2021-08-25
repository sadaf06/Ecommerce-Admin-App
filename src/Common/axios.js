import axios from "axios";
import { url } from "../urlConf";
import store from "./store"
import { authConst } from "./constant";
let token = window.localStorage.getItem("token");
const axiosIn = axios.create({
  baseURL: url,
  headers: { auth: token ? token : "" },
});
axiosIn.interceptors.request.use((req) => {
  const { auth } = store.getState();
  // console.log(auth)
  req.headers.auth = auth.token ? auth.token : "";
  return req;
}, (error) => {
  console.log(error)
})

axiosIn.interceptors.response.use((res) => {
  return res;
}, (error) => {
  console.log(error.response);
  const { status, data } = error.response;
  if (status >= 400) {
    alert(data.message);
    token = window.localStorage.clear();
    store.dispatch({ type: authConst.LogOut_Success })
  }
  return Promise.reject(error);
})
export default axiosIn;
