import { GET_GROUP, PAGE_LOADING, SET_ADMIN_STATUS } from "../actions/types";
import isEmpty from "../utils/is-empty";

const initialState = {
  group: {},
  isAuthenticated: false,
  admin: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GROUP:
      return {
        ...state,
        group: action.payload,
        loading: false
      };
    case SET_ADMIN_STATUS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    default:
      return state;
  }
}
