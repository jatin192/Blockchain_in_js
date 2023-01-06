
const express = require("express"); //npm i express --save add script in package.json file -> "start":"node index.js"  -> run command npm run start ->go on http://localhost:3000/api/blocks
//npm i nodemon --save-dev -> add script in package.json "dev":"nodemon index.js" ->run npm run dev ->don't need to run server again again when change occur
const bodyParser =require("body-parser"); // now our express is not capable to receive the data on server in JSON format ->use -> npm i body-parser --save
const Blockchain =require("./blockchain");
const PubSub =require("./pubish_subscribe");
// run more than 1 PORT --->  npm i cross-env@5.2.0 --save-dev   -> add script in package.json "dev-peer":"cross-env GENERATE_PEER_PORT ='true' nodemon index.js"
//_______________________________________________________________________________________________________________________________________________________________________________________________________

//cmd: npm run dev
//_______________________________________________________________________________________________________________________________________
// sudo service redis-server  status should be active and running in backgroud
const request =require("request");// syncronization ------> npm i request@2.88.0 --save   //miner add new node 2  -> peer 3 add now -> per 3 see only genesis -> starting se he show hojaye 
const app = express(); 
const blockchain =new Blockchain();        //new blockchain
const pubsub_obj_1 = new PubSub({ blockchain });

const DEFAULT_PORT =3000;
const ROOT_NODE_ADDRESS =`http://localhost:${DEFAULT_PORT}`;  // ~ ke neche wala ` for ${}

setTimeout
( 
    () => pubsub_obj_1.broadcast_chain(),1000
);



app.use(bodyParser.json())                // receive data in JSON format  if comes

//__________________________________________________reading_____________________________________________________________________________________________________________________________________________________

app.get("/api/blocks",(req,res) =>
{
    res.json(blockchain.chain)
})                                          //we cant direct pass direct jss object we have to convert into json and then pass for reading purpose 

//___________________________________________________writing____________________________________________________________________________________________________________________________________________________

app.post("/api/mine",(req,res) =>
{ 
    const{data} =req.body; 
    blockchain.add_block({data})
    pubsub_obj_1.broadcast_chain();
    res.redirect('/api/blocks')      //redirect to dispay changes or update on browser page
})

//________________________________________________________________________________________________________________________

const syn_chain = () => {    //func help in syc..
    request(
      { url: `${ROOT_NODE_ADDRESS}/api/blocks` },  //url se request kare ga  ->api/block me jaye ga
      (error, reposnse, body) => {           //callback function  ->koi error aaya hai kya + kya response aaya + body me kya hai
        if (!error && reposnse.statusCode === 200) {   //working properly means repose= 200,response = 404 means error
          const rootChain = JSON.parse(body);
          console.log("Replace chain on sync with", rootChain);
          blockchain.replace_chain(rootChain); //root chain jisme already change hochike hai or run bhe kr rahi hai phale se
        }
      }
    );
  };

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT =='true')
{
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;  // if PEER_PORT true aagya to DEFAULT_PORT ko check he nahi kare ga
app.listen(     PORT      ,     () => {
    console.log('listening to port :',PORT);
    syn_chain();
}       );
// app.listen(     PORT      ,     () => {console.log('listening to port :${PORT}');}       );


//_______________________________________________________________________________________________________________________

// express framwork give capability to become node 
// A [] [] [new_block]                                  c[][]
//                              B[][] 
// c,b will check new_block is valid or not then add in there database so to intract with new_block information by B,C we need to use express framwork
// Normal system(laptop) -> change into server -> so that other node can read/write the infomation on blockchain for validatin pupose and adding block

// get  ->  use for read
// post ->  use for write
// req   =  request 
// res   =  response