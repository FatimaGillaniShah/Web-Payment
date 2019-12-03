import { ADD_POST,FETCH_SERVICE } from './actions';

const initialState = [];

export default function Post(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        
        {         
          groups: action.groups,
          services: action.services,
        }
      ];
    case FETCH_SERVICE:
      return[
        {
        serviceObject: action.services
      }
      ];

    
    default:
      return state;
  }
}


