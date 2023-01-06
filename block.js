const {genesis_data, Geneis_data} =require('./config');    //import
const create_hash =require('.//crypto_hash');               //import
const hex_to_binary =require("hex-to-binary");    //npm i hex-to-binary@1.0.1 --save

class Block
{
    // constructor(time_stamp,prev_hash,hash,data)     
    constructor({nounce,difficulty,time_stamp,prev_hash,hash,data})  //call on object created , data ==transaction
    {
        this.nounce =nounce
        this.difficulty =difficulty
        this.time_stamp =time_stamp
        this.prev_hash =prev_hash
        this.hash =hash
        this.data =data
    }
    //static function - because we do not want to create genesis block again for each block
    static genesis_block() //static function   ->  Such methods cannot be accessed through instantiated objects but could be accessed through the class name
    {
        return new this(Geneis_data);
    }

        // All Hashes
        // ---------
        // difficulty
        // ---------
        // __________ 

        // Miner nounce change kr kr ke dekhte hai jis se block ka hash bhe change hota hai or jab hash ke difficult match hojati hai to uss hash ko finalize kardete hai 
    
    static mine_block({prev_block,data_}) //again static function is use because we don't want to  again & again create  mine_block function for each block
    {
        let time__stamp,nounce_,hash_;
        nounce_ =0;
        const prev__hash =prev_block.hash;          // const => use for static value
        let difficulty_ = prev_block.difficulty;    // let => use of fluchating value  or non-static value
        // let {difficulty_} = prev_block; //??
        do
        {
            time__stamp =Date.now() // current timestamp usig inbuild function in jss == Date.now()
            difficulty_ = Block.adjust_difficulty(prev_block,time__stamp)
            nounce_++;
            hash_ = create_hash(nounce_,difficulty_,time__stamp,prev__hash,data_) 

        }while(hex_to_binary(hash_).substring(0,difficulty_) !== '0'.repeat(difficulty_));    //hash should be convert into bits => advantange=> avg_time.js file in hash and bits compares difficulty of both  
        // }while(hash_.substring(0,difficulty_) !== '0'.repeat(difficulty_)); 

        // new_block =new this({...})     // (same) Block ==this   (for now)
        // new_block =new Block({time__stamp,prev__hash,hash_,data_})   //same
        const new_block =new Block({nounce:nounce_,difficulty:difficulty_,hash:hash_,time_stamp:time__stamp,prev_hash:prev__hash,data:data_}) //object 

        return new_block;
    }
    static adjust_difficulty(prev_block,current_block_time_stamp)
    {
        let d= prev_block.difficulty;
        if(d<0)
        {
            d=1;
        }
        else if(Mining_rate > (current_block_time_stamp - prev_block.time_stamp))
        {
            d++;
        }
        else if (Mining_rate < (current_block_time_stamp - prev_block.time_stamp))
        {
            d--;
        }
        return d;
    }
}

module.exports=Block; //export


// ___________________________________________________Demonstration________________________________________________________________


// const genesis_1 = Block.genesis_block(); //***** we don't need to create object to collect genesis_block() function we can directly call using class as reference 
// console.log("genesis block = ",genesis_1);

// // const block_1 =new Block("21/12/2022","000","0x1","1st block")
// //pass as an object   == advantage
// // constructor({b,a})   , object_1 = new object({ a:" ", b:" "})
// const block_1 =new Block({hash:"0x1",time_stamp:"21/12/2022",prev_hash:"000",data:"1st block"})  
// console.log("block 1 =",block_1);

// const mined_block = Block.mine_block({prev_block:block_1,data_:"mined_block"}); 
// console.log("mined_block=",mined_block)



//------------------------------------------------------------------