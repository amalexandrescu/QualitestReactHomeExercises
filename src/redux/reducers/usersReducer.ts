import { UserEssentialInfo } from "../../pages/types";
import {
  FETCH_USERS_FAIL,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
} from "../actions";

export const initialState: {
  data: UserEssentialInfo[];
  error?: string;
  isLoading: boolean;
} = {
  data: [],
  isLoading: false,
};

interface IreduxAction {
  type: string;
  payload?: any;
}

const userReducer = (state = initialState, action: IreduxAction) => {
  switch (action.type) {
    case FETCH_USERS_START:
      return { data: [], isLoading: true };
    case FETCH_USERS_SUCCESS:
      return {
        data: action.payload,
        isLoading: false,
      };
    case FETCH_USERS_FAIL:
      return {
        data: [],
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
