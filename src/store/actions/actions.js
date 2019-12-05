import axios from "axios";
export const FETCH_DATA = "FETCH_DATA";

export const getAllData = () =>{
  return(dispatch)=>{
    let MainPaymentsRequest = {
      "country": "BHR",
      "locale": "en-US"
  }
    axios.post(process.env.REACT_APP_BASEURL + 'api/web/v1/payments/available',
    JSON.stringify(MainPaymentsRequest))
    .then((res) => {
      
      console.log(res.data.groups);
    dispatch({ 
      type: FETCH_DATA, payload:res.data
     })}
   )};
  
}
