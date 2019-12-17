import {FETCH_HISTORY } from '../store/actions/actions';

const initialState = []

export default (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_HISTORY:
      {
        return {   
         ...state,       
         transactions : action.payload.transactions
        }
       }
    

    default:
      return state;
  }
}


