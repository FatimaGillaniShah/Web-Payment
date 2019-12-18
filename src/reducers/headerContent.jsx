import {FETCH_HEADER_DATA } from '../store/actions/actions';

const initialState = {
  cartItemCount : 0,
  isLoggin : false
}

export default (state = initialState, action) => {
  
  switch (action.type) {

      case FETCH_HEADER_DATA:

          {
           return {      
            cartItemCount: action.cartItemCount,
            isLoggin: action.isLoggin
           }
          }

          
          
          
    default:
      return state;
  }
}


