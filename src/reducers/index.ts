import { UserEssentialInfo } from "../pages/types"

const initialState = {
  users: Array<UserEssentialInfo>,
}

const mainReducer = (state = initialState, action:any) => {

  switch (action.type) {
    case 'FETCH_USERS':
      return {
        users: action.payload,
      }
    default:
      return state
    
  }}

export default mainReducer