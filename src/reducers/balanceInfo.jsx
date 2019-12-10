import {FETCH_BALANCE } from '../store/actions/actions';

const initialState = null

export default (state = initialState, action) => {
  
  switch (action.type) {

      case FETCH_BALANCE:

          {
           return action.payload
          }
  
    default:
      return state;
  }
}


