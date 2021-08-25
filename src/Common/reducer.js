import { combineReducers } from "redux";
import CategoryReducer from "../Containers/Category/CategoryReducer";
import ProductReducer from "../Containers/Product/ProductReducer";
import authReducer from "../Containers/SignIn/SignInReducer";
import signUp from "../Containers/SignUp/SignUpReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  SignUpAuth: signUp,
  CategoryFectch: CategoryReducer,
  ProductAdd: ProductReducer
});

export default rootReducer;
