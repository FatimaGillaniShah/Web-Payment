import _ from 'lodash';
import m from 'moment';
import {LoginRequestInfo} from '../../api/ApiCalls';

export function logout()
{
    localStorage.removeItem("sessionId");
    localStorage.removeItem("sessionTime");
    logoutHTML();
    }

export function logoutHTML()
{
  document.getElementsByClassName("customNav")[0].style.display = "none"; 
  document.getElementsByClassName("btnTopNavLogin")[0].style.display = "block";
  document.getElementsByClassName("btnTopNavLogout")[0].style.display = "none";
  document.getElementsByClassName("_accountBalance")[0].innerHTML = "";
    }

export function PaySuccessComplete()
{
  localStorage.removeItem("Services");
  localStorage.setItem('cartItemCount' , 0);
  let isDataCountAvailable = document.getElementsByClassName('cartIconCount')[0].hasAttributes('data-count');
  
  if(isDataCountAvailable)
  {
    document.getElementsByClassName('cartIconCount')[0].removeAttribute('data-count');
  }
    }

export function login()
{
    
    let msisdn = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
  
      if(msisdn === "" || msisdn === null || msisdn === undefined)
      {
          alert("Phone number missing");
          return;
      }
      if(password === "" || password === null || password === undefined)
      {
          alert("Password missing");
          return;
      }

      let LoginRequestObject = {
        "msisdn": "973"+msisdn,
        "password": password,
        "locale": "en-US"
    }
    
    let LoginResult = LoginRequestInfo(LoginRequestObject);
    Promise.resolve(LoginResult).then(result  => {
        if (result  != undefined) {
            let message = "";
            let resultData = _.get(result.data, 'error-code');
            let resultDataMessage = _.get(result.data, 'error-message');
            if(resultData === 0)
            {
                message = "Success";
                let sessionId = _.get(result.data, 'session-id');
                localStorage.setItem('sessionId' , sessionId);
                localStorage.setItem('sessionTime' , Date());
                document.getElementsByClassName("btnTopNavLogout")[0].style.display = "block";
                document.getElementsByClassName("btnTopNavLogin")[0].style.display = "none";
                document.getElementsByClassName("customNav")[0].style.display = "block";              
                window.location.replace("/");
            }
            else
            {
                if(resultData === null)
                {
                    alert("Wrong Activation Code");
                    message = "Wrong Activation Code";
                }
                else
                {
                    switch (resultData) {
                        case 100:
                            message = "This Number is locked";
                            break;
                        case 101:
                            message = "Incorrect password";
                            break;
                        case 103:
                            message = "Activate User";
                            break;
                        case 109:
                            message = resultDataMessage;
                            break;
                        case 106:
                            message = "Something went wrong";
                            break;
                        default:
                            break;
                    }
                    alert(message);
                }
            }
           
        }
    })
  }

    

export function validateLogin()
{
    let sessionId = localStorage.getItem('sessionId');
    if(sessionId !== undefined && sessionId !== null)
    {
        let ExpiryMinutes = 15;

        let sessionTime = localStorage.getItem('sessionTime');
        var now = new Date();
        var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        var end = m(sessionTime)
        var diff = m.utc(m(now,"HH:mm:ss").diff(m(end,"HH:mm:ss"))).format("HH:mm:ss")
        time = diff.split(":");
        var minutes = parseInt(time[1])
      
       if(minutes >= ExpiryMinutes){
        return false;                
       }
        else{
            return true;
        }
    }
    else
    {
      
    }
    
    }