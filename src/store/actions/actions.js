import axios from "axios";
export const FETCH_DATA = "FETCH_DATA";
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_HEADER_DATA = "FETCH_HEADER_DATA";

export const getAllData = () =>{
  return(dispatch)=>{
    let MainPaymentsRequest = {
      "country": "BHR",
      "locale": "en-US"
  }
    axios.post(process.env.REACT_APP_BASEURL + 'api/web/v1/payments/available',
    JSON.stringify(MainPaymentsRequest))
    .then((res) => {

    dispatch({ 
      type: FETCH_DATA, payload:res.data
     })}
   )};
  
}

export const getHistory = () =>{
  return(dispatch)=>{
    let sessionId = localStorage.getItem('sessionId');
    let historyRequestObject = {

      'session-id': sessionId,
      'offset': 0,
      'count': 0,
      'day-filter': 1,
      'transaction-type-filter': 1,
      'locale': 0,
  }
  axios.post(process.env.REACT_APP_BASEURL + 'api/web/v1/Payments/History',
  JSON.stringify(historyRequestObject))
    .then((res) => {
  
    dispatch({ 
      type: FETCH_HISTORY, payload:res.data
     })}
   )};
  
}



export const getHeaderInfo = (cartItemCount,isLoggin) => {
  return {
    type: FETCH_HEADER_DATA,
    cartItemCount: cartItemCount,
    isLoggin: isLoggin
  };
}