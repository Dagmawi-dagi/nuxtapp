//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


import { API_INFO } from "../utils/apisInfo"

export default defineEventHandler(async (event) => {
    // here this will be the first middleware to be excuted to set some apiroute info in using the "request header" and the apiinfo Obj on utills/apiinfo.js
    // NOTE:  when you need to send api request YOU NEED TO SEND THE RIGHT API_INFO KEY
    event.context.APIINFO = API_INFO[getRequestHeaders(event).apiref]
})
 