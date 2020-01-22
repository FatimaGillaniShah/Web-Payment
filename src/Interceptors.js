import axios from 'axios';

export default {
  setupInterceptors: (history) => {

    axios.interceptors.response.use(response => {
      return response
    }, error => {

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
     debugger
      return Promise.reject(error);
    });
  },
};