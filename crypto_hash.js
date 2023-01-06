const crypo =require('crypto') // importing the module name crypo which javascript provide 

// function 

const crypo_hash=(...inputs)=>         //input kitne bhe hosakte hai using sprid operator
{
    const hash = crypo.createHash("sha256");
    hash.update(inputs.sort().join(""))      // ["hello" "world" = "helloworld"]   BOTH  [ "world" "hello" = "helloworld"] using sort function abcdef...
    return hash.digest("hex") //hex = hexadecimal 64 digits
}

module.exports =crypo_hash  //export






//concatination  "hello" "world" = "helloworld"

// ----------------------Demonstration-------------------------


// obj_1 = crypo_hash("hello" ,"world");
// obj_2 = crypo_hash("world","hello");
// console.log(obj_1);
// console.log(obj_2);

//-------------------------------------------------------------