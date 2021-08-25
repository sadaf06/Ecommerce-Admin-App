import { authConst } from "../../Common/constant";
const initialState = {
  user: {
    firstName: "",
    lastName: "",
  },
  signUpAuthenticating: false,
  signUpAuthenticate: false,
};

export default (state = initialState, action) => {
  //   console.log(action);
  switch (action.type) {
    case authConst.SignUp_Req:
      state = {
        ...state,
        signUpAuthenticating: true,
      };
      break;
    case authConst.SignUp_Succes:
      state = {
        ...state,
        signUpAuthenticating: false,
        signUpAuthenticate: true,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
      break;
  }
  return state;
};
