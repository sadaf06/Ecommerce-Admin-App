import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Containers/Home/Home";
import SignIn from "./Containers/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";
import PrivateRoute from "./Containers/Home/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserSignin } from "./Containers/SignIn/SignInAction";
import { useEffect } from "react";
import Category from "./Containers/Category/CategoryCont";
import Order from "./Containers/Orders/Order";
import Products from "./Containers/Product/Products";
import { fetchCat } from "./Containers/Category/CategoryAction";

function App() {
  const FetchedCategory = useSelector((state) => state.CategoryFectch);

  const dispatch = useDispatch();
  // Check user sign in or not
  const auth = useSelector((state) => state.auth);
  const signupAuthh = useSelector((state) => state.SignUpAuth);
  // const CateAuth = useSelector((state) => state.CategoryFectch);


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserSignin());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCat());
  }, [FetchedCategory.added]);

  const loader = () => {
    if (auth.loading) {
      return <div className="sign" />;
    }
    if (signupAuthh.signUpAuthenticating) {
      return <div className="sign" />;
    }
  };
  return (
    <div className="App">
      {loader()}
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/order" component={Order} />
        <PrivateRoute path="/products" component={Products} />
        <Route path="/Signin" component={SignIn} />
        <Route path="/Signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
