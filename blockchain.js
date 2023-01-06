//npm i hex-to-binary@1.0.1 --save
const block =require('./block');
const create_hash =require('./crypto_hash');

class Blockchain
{
    constructor()
    {
        this.chain =[block.genesis_block()];   //array
    }
    add_block({data})
    {
        const length_of_chain = this.chain.length;
        const prev__block = this.chain[length_of_chain -1];
        const new_block = block.mine_block({prev_block:prev__block,data_:data});
        this.chain.push(new_block);
    }  

    // if hacker insert malicious block 
    static valid_chain_check(chain_arg)  //chain_arrg == passing chain as argument
    {
        // both have different instants so we can't directly compare ->it always give false =>use JSON.stringify  ==comparing in string form
        if(JSON.stringify(chain_arg[0])!= JSON.stringify(block.genesis_block())) //first block must be genesis
        {
            return false;
        }
        
        for(let i=1;i<chain_arg.length;i++)
        {
            if(chain_arg[i].prev_hash != chain_arg[i-1].hash)  //hash of prev_block store in current hash        
            {
                return false;    
            }
            if(create_hash(chain_arg[i].time_stamp,chain_arg[i].data,chain_arg[i].prev_hash,chain_arg[i].nounce,chain_arg[i].difficulty) != chain_arg[i].hash) //taking data,prev_has,time_stamp,nounce,difficulty as input to generate hash
            {
                return false;
            }
            // if miner can change difficulty to very high(no miner can mine)
            // if mine can change difficulty to very low(any minear can mine very easily => get reward  easily)
            // to avoide this change should not greater than 1
            if(Math.abs(chain_arg[i].difficulty -chain_arg[i-1].difficulty) >1)      
            {
                return false;
            }
        }
        return true;
    }
    replace_chain(chain_arg)
    {
        if(chain_arg.length <= this.chain.length) //longest chain should be preffered
        {
            console.error("The Incoming chain is not longer")
            return;
        }
        else if(Blockchain.valid_chain_check(chain_arg) === false)  //checking
        {
            console.error("The Incoming chain is not valid (contain malicious block)")
            return;
        }
        else
        {
            this.chain =chain_arg
            console.log(" Current chain is replaced by Incoming chain ") //Since Incoming chain is longer and valid so
        }
        
    }

}
// const Object_1 =new Blockchain();
// Object_1.add_block({ data: "block 1"});
// Object_1.add_block({ data: "block 2"});
// console.log(Object_1);
// const result = Blockchain.valid_chain_check(Object_1.chain);
// console.log(result);

module.exports = Blockchain;
