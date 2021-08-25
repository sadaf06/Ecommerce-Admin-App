import axiosIn from "../../Common/axios";
import { authConst } from "../../Common/constant";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConst.LOGIN_REQ });
    const res = await axiosIn.post("/admin/signin", {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConst.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
      alert(res.data.message);
    } else {
      dispatch({
        type: authConst.LOGIN_FAILURE,
        payload: { error: res.message },
      });
    }
  };
};
export const isUserSignin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConst.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConst.LOGIN_FAILURE,
        payload: { error: "user must be login" },
      });
    }
  };
};
export const Logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConst.LogOut_REQ });
    const res = await axiosIn.post("/admin/signout");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConst.LogOut_Success });
    } else {
      dispatch({ type: authConst.LogOut_Fails, payload: "Not Signed Out" });
    }
  };
};
