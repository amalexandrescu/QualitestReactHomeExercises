import { FetchUsersResponse } from "../../pages/types";
import { AppDispatch } from "../store/store";
import { initialState } from "../reducers/usersReducer";
export const FETCH_USERS_START = "FETCH_USERS_START";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const isUserDataLoading = () => {
  return {
    type: FETCH_USERS_START,
  };
};

export const isUserDataError = (errorMessage: string) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: errorMessage,
  };
};

export const getUsersAction = (value: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isUserDataLoading());
    if (value <= 5000) {
      try {
        const response: Response = await fetch(
          `https://randomuser.me/api/?results=${value}`
        );
        const { results } = (await response.json()) as FetchUsersResponse;

        const fetchedUsersWithNameAndImage = results.map(
          ({ name, picture }) => ({
            firstName: name.first,
            lastName: name.last,
            image: picture.large,
          })
        );

        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: fetchedUsersWithNameAndImage,
        });
      } catch (error) {
        console.log("error--message", error);
        dispatch(isUserDataError("Failed to fetch"));
      }
    }
  };
};
