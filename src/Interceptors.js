import axios from 'axios';

export default {
  setupInterceptors: (store, history) => {

      axios.interceptors.response.use(response => {
        return response;
      }, error => {
 
          console.log(error)

      if (error.response.status === 401) {

        //store.dispatch(logout());
      }
      if (error.response.status === 403) {
        this.props.history.push('/login');
     }

      if (error.response.status === 404) {
         history.push('/not-found');
      }

      if (error.response.status === 500) {
        history.push('/not-found');
     }
      return Promise.reject(error);
    });
  },
};