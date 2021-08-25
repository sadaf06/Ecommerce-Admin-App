import { categoryConst } from "../../Common/constant";

const initialState = {
  category: [],
  Loading: false,
  fectched: false,
  added: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConst.Cat_Req:
      state = {
        ...state,
        Loading: true,
      };
      break;
    case categoryConst.Cat_Success:
      state = {
        ...state,
        Loading: false,
        fectched: true,
        added: false,
        category: action.payload,
      };
      break;
    case categoryConst.Add_Cat_Success:
      state = {
        ...state,
        Loading: false,
        added: true,
      };
      break;
  }
  return state;
};
