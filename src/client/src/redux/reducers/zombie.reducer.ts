import { Zombie } from '../../models/zombie';
import { LIST_ZOMBIES_REQUEST, LIST_ZOMBIES_SUCCESS, LIST_ZOMBIES_FAILURE } from '../actions/zombie.actions';

export interface ZombieState {
  zombies: [];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const initialState: ZombieState = {
  zombies: [],
  loading: false,
  error: false,
  errorMessage: '',
};

const zombieReducer = (state = initialState, action: { type: string, payload: Zombie[] }) => {
  switch (action.type) {
    case LIST_ZOMBIES_REQUEST:
      return { ...state, loading: true, error: false };
    case LIST_ZOMBIES_SUCCESS:
      return {
        ...state,
        zombies: action.payload,
        loading: false,
        error: false,
      };
    case LIST_ZOMBIES_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default zombieReducer;
