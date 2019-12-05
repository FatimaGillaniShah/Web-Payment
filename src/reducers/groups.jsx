import {FETCH_DATA } from '../store/actions/actions';


const initialState = {
  items : [],
services : null
}

export default (state = initialState, action) => {
  
  switch (action.type) {

      case FETCH_DATA:

          {
           return {           
            groups: action.payload.groups,
            services: action.payload.services
           }
          }
          
          
    default:
      return state;
  }
}


