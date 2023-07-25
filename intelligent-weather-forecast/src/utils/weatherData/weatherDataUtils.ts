import * as apiRequestUtils from '../requestUtils/api-request-utils';


export const getWeatherData = async function(params:any){
    let url:string = 'data/2.5/weather'
    const data = await apiRequestUtils.getReq(url, params);  
    return data;
  }