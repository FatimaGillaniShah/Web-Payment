import m from 'moment';
export function PaySuccessComplete()
{
  localStorage.removeItem("Services");
  localStorage.setItem('cartItemCount' , 0);
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
            localStorage.removeItem("sessionId");
            localStorage.removeItem("sessionTime");
            return false;                
        }
        else
        {
            return true;
        }
    }
    else
    {
        return false;
    }
        
}