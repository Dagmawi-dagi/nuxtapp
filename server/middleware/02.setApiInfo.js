//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


import { API_INFO } from "../utils/apisInfo"
import { createError, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
    // here this will be the first middleware to be excuted to set some apiroute info in using the "request header" and the apiinfo Obj on utills/apiinfo.js
    const apiref = getHeader(event, 'apiref');
    if (!apiref) throw createError({ statusCode: 400, message: 'Missing apiref header' });
    // Retrieve API configuration
    const apiConfig = API_INFO[apiref];
    if (!apiConfig) throw createError({ statusCode: 404, message: 'API route config not found' });
    // if apiref key is sent with the header and the key is correct pass the APIINFO config to the event.context to be on the comming middlewares or final api handler
    event.context.APIINFO = API_INFO[getRequestHeaders(event).apiref]
})
 