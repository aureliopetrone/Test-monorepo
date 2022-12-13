import {
    onValueWritten,
} from "firebase-functions/v2/database";


export const testfunction = onValueWritten('/presence/{userId}/', async (event) => {

    console.log("Hello world")
    return false

})



