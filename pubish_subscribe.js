const redis = require("redis"); 
// npm i redis@2.8.0   and also run in background
// public subscribe model
// techinology used :redish
//_____________________________________________
// run node publisher_subscrib.js
// _____________________________________________
// miner add new block -> broadcast to entire network
const CHANNELS={
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
};
class publish_subscrible_model
{
    constructor({ blockchain }) // passing instance of blockchain
    {
        this.blockchain = blockchain; 
        this.publisher =redis.createClient();
        this.subscriber =redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message',(channel,message)=>this.handle_message(channel,message));
    }
    handle_message(channel,message) 
    {
        console.log("\n",'Message receive',"\n",'   channel:', channel,"\n",'   Message:',message,"\n");
        // console.log('Message receive.channel: ${channel} Message ${message}'); //not worinking ??
        const pass_Message_in_JSON =JSON.parse(message)
        if (channel == CHANNELS.BLOCKCHAIN)  
        {
            this.blockchain.replace_chain(pass_Message_in_JSON); //check
        }
        
    }
    publish ({channel,message})
    {
        this.publisher.publish(channel,message);
    }
    broadcast_chain()
    {
        this.publish({
          channel:CHANNELS.BLOCKCHAIN,
          message: JSON.stringify(this.blockchain.chain),
        }); //JSON.stringify ->use for convert into string (this.blockchain.chain  is an array so it should convert into string) 
    }
}

// const obj_1 = new publish_subscrible_model();S
// publisher publish to kar de but uper wali line run hone me time lagjaye (channel create fer subscriber subscribe kar)   == publisher publish kar de  channel pe but subscriber subscribe bad me kar channel ko to message jaye ga he nahi 
// setTimeout( 
//     ()=>obj_1.publisher.publish(CHANNEL.TEST,"Hellooo"),1000  //publisher publish kar raha 'CHANNEL' channel pe 'Hellooo' data publish kar raha 
// );
module.exports = publish_subscrible_model;
// publisher(the times of india,amar ujala,danik jagran)    <----channel---->  subscriber(user's)