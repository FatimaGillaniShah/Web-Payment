import axios from 'axios';

export default {
  setupInterceptors: (store, history) => {

    axios.interceptors.response.use(undefined,error => {
debugger
     if(error.message === 'Network Error' && !error.response){
         history.push('/NetworkError');        
      }
      const status = error.response; 
      if (status === 404) {
         history.push('*');
      }
      else if (status === 500) {
        history.push('/NetworkError');
     }
      return Promise.reject(error);
    });
  },
};