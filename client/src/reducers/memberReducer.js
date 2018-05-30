import { GET_MEMBER } from "../actions/types";
// import isEmpty from "../utils/is-empty";

const initialState = {
  member: {},
  showMemberForm: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER:
      return {
        ...state,
        member: action.payload,
        showMemberForm: false
      };
    default:
      return state;
  }
}
