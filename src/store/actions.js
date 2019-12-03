export const ADD_POST = "ADD_POST";
export const FETCH_SERVICE = "FETCH_SERVICE_BY_ID";


export function addPost(groups,services) {
  
  return {
    type: ADD_POST,
    groups,
    services
  };
}

export function GetServiceById(serviceId) {  
  return {
    type: FETCH_SERVICE,
    serviceId
  };
}

