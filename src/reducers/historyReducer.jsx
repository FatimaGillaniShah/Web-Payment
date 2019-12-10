import {FETCH_HISTORY } from '../store/actions/actions';

const initialState = null

export default (state = initialState, action) => {
  
  switch (action.type) {

      case FETCH_HISTORY:

          {
           return action.payload.transactions
          }
  
    default:
      return state;
  }
}


