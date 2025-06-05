//1- here we will validate the reqBody with the DBSchema 
//2- we will validate the reqBody with custome validation rules defined for this route on ApiRouteRefs.js

export default defineEventHandler( async (event) => {
    console.log('4444');
    // const result = await readValidatedBody(event, body => generateZodSchema(schema,'testss').safeParse(body))
});