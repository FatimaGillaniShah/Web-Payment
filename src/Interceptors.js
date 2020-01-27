import axios from 'axios';
import _ from 'lodash';
export default {
  setupInterceptors: (history) => {

    axios.interceptors.response.use(response => {
  
      let status = _.get(response.data, 'error-code');
      if(status === 105){
        let errorMessage = 'Your Session is Expired.';
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionTime");
        history.push('/login', errorMessage={errorMessage}); 
      }
      else if(status === 404){
        history.push('/NetworkError'); 
      }
      else if(status === 401){
        history.push('/login'); 
      }
      else if(status === 500){
        history.push('/NetworkError'); 
      }
      return response
    }, error => {
   
     if(error.message === 'Network Error' && !error.response){
         history.push('/NetworkError');        
      } 
      return Promise.reject(error);
    });
  },
};