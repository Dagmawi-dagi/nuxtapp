//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


//1- here we will validate the reqBody with the DBSchema 
//2- we will validate the reqBody with custome validation rules defined for this route on ApiRouteRefs.js

export default defineEventHandler( async (event) => {
    // const result = await readValidatedBody(event, body => generateZodSchema(schema,'testss').safeParse(body))
    // check if we have modifed body to mean thta have multipart form data 
    // else just use the regular readValidatedBody cus it will read from the req.body
}); 