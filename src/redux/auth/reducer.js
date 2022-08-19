import actions from './actions';

const initState = { idToken: null, idUser: null, idStore: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        idUser: action.idUser,
        idStore: action.idStore
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
