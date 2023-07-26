import * as CONST from './../../constants/apiConstants';

/**
 * To send GET Request
 * @param {String} path - url path for GET request
 */
 export const getReq = async function(path:string, queryParams?: object){
    
    let url = CONST.OPEN_MAP_WEATHER_API + "/" + path;

    const updatedQueryParams = {
        ...queryParams,
        appid: CONST.APP_ID
      };


    if (updatedQueryParams) {
        const queryString = Object.entries(updatedQueryParams)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&");
    
        url += "?" + queryString;
      }
    console.log(url);

    try {
          const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
          }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response;
        } catch (error) {
        // Handle the error here
        console.error('Error fetching data:', error);
        return null;
    }

    return await fetch(url,
    {
      method:'GET',
      headers:{'Content-Type': 'application/json',
                'Access-Control-Allow-Methods':'GET,HEAD,PUT,PATCH,POST,DELETE'}
    });
  }