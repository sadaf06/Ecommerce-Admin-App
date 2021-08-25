import axiosIn from "../../Common/axios";
import { ProductConst, ProductFetchConst } from "../../Common/constant";

export const addProduct = (form) => {
    console.log(form)
    return async (dispatch) => {
        dispatch({ type: ProductConst.ProductAddReq });
        const res = await axiosIn.post("/product/Add", form);
        if (res.status === 200) {
            dispatch({ type: ProductConst.ProductAddSucces, payload: res.data.product })
        }
    }
}

export const fetchProduct = () => {
    return async dispatch => {
        const res = await axiosIn.get("/fetchProduct");
        // console.log(res.data);
        if (res.status === 200) {
            dispatch({ type: ProductFetchConst.ProductFetchSucces, payload: res.data })
        }
    }
}