import axios from 'axios';
import _ from 'lodash';

export function LoginRequestInfo(PaymentsLoginRequest){
  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/login',
    JSON.stringify(PaymentsLoginRequest)
  );}

export async function RequestInfo (paymentsInfoRequestObj){
    let result;
     await axios.post(
      process.env.REACT_APP_BASEURL + 'api/web/v1/payments/request-info',
      JSON.stringify(paymentsInfoRequestObj)
    ).then((res) => {
        result = res;
      return result;
    })
    .catch(error => {
    
        console.log('ERROR::', error);
      });

      return result;
  }

export async function Pay (paymentsPayRequestObj){
        let result;
     await axios.post(
      process.env.REACT_APP_BASEURL + 'api/web/v1/payments/pay',
      JSON.stringify(paymentsPayRequestObj)
    ).then((res) => {
        result = res;
      return result;
    })
    .catch(error => {
       
        console.log('ERROR::', error);
      });

      return result;
  }
  
export async function BalanceInfo (sessionId){
  axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/balance',
    JSON.stringify({
      "session-id": sessionId
    })
  ).then((res) => {
    let isError = _.get(res.data, 'error-code');
    if (isError === 0) {
      let currency = _.get(res.data, 'currency');
      let Amount = _.get(res.data, 'balance');
     // document.getElementsByClassName("_accountBalance")[0].innerHTML = currency + " " + Amount;
    }
  });
  }

  