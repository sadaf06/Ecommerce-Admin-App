import axiosIn from "../../Common/axios";
import { categoryConst } from "../../Common/constant";

export const fetchCat = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConst.Cat_Req });
    const res = await axiosIn.get("/category");

    if (res.status === 200) {
      dispatch({
        type: categoryConst.Cat_Success,
        payload: res.data.formatedCatlist,
      });
    }
  };
};
export const addCategory = (newCat) => {
  return async (dispatch) => {
    dispatch({ type: categoryConst.Cat_Req });
    const res = await axiosIn.post("/category/add", newCat);
    console.log(res);
    if (res.status === 200) {
      dispatch({ type: categoryConst.Add_Cat_Success });
    }
  };
};
export const updateAction = (form) => {
  console.log(form)
  return async (dispatch) => {
    const res = await axiosIn.post("/category/update", form);
    if (res.status == 201) {
      dispatch({ type: categoryConst.Add_Cat_Success });
    } else {
      console.log(res)
    }
  }
}
export const deleteCategory = (ids) => {
  return async (dispatch) => {
    const res = await axiosIn.post('/category/delete', { ids })
    if (res.status == 200) {
      dispatch({ type: categoryConst.Add_Cat_Success });
      console.log(res)
    } else {
      console.log(res)
    }
  }
}