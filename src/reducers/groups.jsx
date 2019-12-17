import {FETCH_DATA } from '../store/actions/actions';

const initialState = {
  groups : [],
  services : []
}

export default (state = initialState, action) => {
  
  switch (action.type) {

      case FETCH_DATA:

          {
           return {   
            ...state,       
            groups: action.payload.groups,
            services: action.payload.services
           }
          }

          
          
          
    default:
      return state;
  }
}


