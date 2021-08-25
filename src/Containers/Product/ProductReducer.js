import { ProductConst, ProductFetchConst } from "../../Common/constant"

const initialState = {
    Product: [],
    AddReq: false,
    AddedSucces: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ProductConst.ProductAddReq:
            state = {
                ...state,
                AddReq: true
            }
            break;
        case ProductConst.ProductAddSucces:
            state = {
                ...state,
                AddReq: false,
                AddedSucces: true,
            }
            break;
        case ProductFetchConst.ProductFetchSucces:
            state = {
                ...state,
                Product: action.payload.productList,
                AddedSucces: false,
            }
            break;
    }
    return state;
}