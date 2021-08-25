import { authConst } from "../../Common/constant";
import axiosIn from "../../Common/axios";
export const signUpAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConst.SignUp_Req });
    const res = await axiosIn.post("/admin/signUp", {
      ...user,
    });
    const { firstName, lastName } = user;

    if (res.status === 201) {
      dispatch({
        type: authConst.SignUp_Succes,
        payload: { firstName, lastName },
      });
    }
  };
};
