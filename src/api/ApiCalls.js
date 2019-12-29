import axios from 'axios';
import _ from 'lodash';

export function LoginRequestInfo(PaymentsLoginRequest) {
  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/login',
    JSON.stringify(PaymentsLoginRequest)
  );
}
export function RegisterRequestInfo(RegisterRequestObject) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/register',
    JSON.stringify(RegisterRequestObject)
  );
}
export function LogoutRequestInfo(LogoutRequestInfo) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/logout',
    JSON.stringify(LogoutRequestInfo)
  );
}
export function ForgetRequestInfo(ForgetRequestObject) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/reset',
    JSON.stringify(ForgetRequestObject)
  );
}
export function ActivateRequestInfo(ActivateRequestRequestObject) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/activate',
    JSON.stringify(ActivateRequestRequestObject)
  );
}
export function AccountRequestInfo(AccountRequestObject) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/info',
    JSON.stringify(AccountRequestObject)
  );
}
export function SubmitRequestInfo(SubmitRequestObject) {

  return axios.post(
    process.env.REACT_APP_BASEURL + 'api/web/v1/users/submit-info',
    JSON.stringify(SubmitRequestObject)
  );
}
export async function RequestInfo(paymentsInfoRequestObj) {
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
export async function Pay(paymentsPayRequestObj) {
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


