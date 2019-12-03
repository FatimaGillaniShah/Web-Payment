import axios from 'axios';
import _ from 'lodash';


export async function MainRequestInfo(){
  let MainPaymentsRequest = {
    "country": "BHR",
    "locale": "en-US"
}
  let result;
  await axios.post(
    
    process.env.REACT_APP_BASEURL + 'api/web/v1/payments/available',
    JSON.stringify(MainPaymentsRequest)
  ).then((res) => {    
      result = res;
      return result
  })
  .catch(error => {
    
      console.log('ERROR::', error);
    });

    return result;

  }

export async function LoginRequestInfo(PaymentsLoginRequest){
  let result;
  debugger;
  await axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/login',
    JSON.stringify(PaymentsLoginRequest)
  ).then((res) => {
    debugger;
      result = res;
    return result
  })
  .catch(error => {
    
      console.log('ERROR::', error);
    });

    return result;
  }

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

  export async function Histroy (PaymentsHistoryRequest){
    let result;
    debugger;
    await axios.post(
      process.env.REACT_APP_BASEURL + 'api/web/v1/Payments/History',
      JSON.stringify(PaymentsHistoryRequest)
    ).then((res) => {
      debugger;
        result = res.data.transactions;
      return result
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
      document.getElementsByClassName("_accountBalance")[0].innerHTML = currency + " " + Amount;
    }
  });
  }

  