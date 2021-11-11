const express=require("express");
const app=express();




//Node.js program to demonstrate the
//filehandle.utimes() method
const fs = require('fs');
const fsPromises = fs.promises;
 
console.log("content of the file before operation :- "
        + fs.readFileSync('example.txt', 'utf8'));
 
// File cTime before operation
fs.stat('example.txt', (err, stats) => {
    if (err) throw err;
 
    console.log("CTime of the file before operation: "
                    + stats.ctime);
});
 
// Initiating asyncrionise function
async function funct() {
 
    // Initializing following variables
    let filehandle = null;
    let prom = null;
 
    try {
 
        // Creating and initiating  filehandle
        filehandle = await
            fsPromises.open('example.txt', 'r+');
 
        // Changing the timestamp of the file
        // by using utimes() method
        prom = filehandle.utimes(0, 10);
 
    } finally {
 
        if (filehandle) {
 
            // File cTime after operation
            (filehandle.stat(true))
                        .then(function (result) {
                console.log("CTime of the file "
                        + "after operation :- "
                        + result.ctime);
            })
 
            console.log("content of the file "
                    + "after operation : " +
                fs.readFileSync('example.txt', 'utf8'));
 
            // Close the file if it is opened.
            await filehandle.close();
        }
    }
}
 
funct().catch(console.error);


app.listen(3001, ()=>{
    console.log("server listneing at port 3001");

})
