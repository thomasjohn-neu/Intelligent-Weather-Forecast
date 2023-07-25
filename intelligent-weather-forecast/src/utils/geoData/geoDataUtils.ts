import * as apiRequestUtils from '../requestUtils/api-request-utils';


export const getGeoData = async function(params:any){
    let url:string = 'geo/1.0/direct'
    const data = await apiRequestUtils.getReq(url, params);  
    return data;
  }