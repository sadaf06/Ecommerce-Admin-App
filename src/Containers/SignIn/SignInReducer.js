import { authConst } from "../../Common/constant";

const initState = {
  authenticate: false,
  authenticating: false,
  loading: false,
  msg: "",
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConst.LOGIN_REQ:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authConst.LOGIN_SUCCESS:
      state = {
        ...state,
        authenticate: true,
        authenticating: false,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;
    case authConst.LOGIN_FAILURE:
      state = {
        ...state,
        authenticate: false,
        authenticating: false,
        loading: false,
      };
      break;
    case authConst.LogOut_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConst.LogOut_Success:
      state = {
        ...initState,
      };
      break;
    case authConst.LogOut_Fails:
      state = {
        ...state,
        loading: false,
        msg: action.payload,
      };
      break;
  }
  return state;
};
