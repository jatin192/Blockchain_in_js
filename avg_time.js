const Blockchain =require('./blockchain');
const blockchain =new Blockchain(); // creating new blockchain

const time_array= [];

blockchain.add_block({data:"1st block"}); // genesis have 1 time_stamp so bigger value -1 = biger value then we can analye properly that why we add one more block which have some standard time_stamp from which we can compare other timestamp of block which will adding con..

for(let i=0;i<900;i++) //runing 9000 times
{
    let prev_block_time_stamp  = blockchain.chain[blockchain.chain.length -1].time_stamp;
    blockchain.add_block({data: 'block ${i}'});
    let current_block  = blockchain.chain[blockchain.chain.length -1];
    let current_block_time_stamp= current_block.time_stamp;

    let time_diff = current_block_time_stamp -prev_block_time_stamp; // in milli second
    time_array.push(time_diff);

    let sum=0;
    for(let j=0;j<time_array.length;j++)
    {
        sum =sum + time_array[j];
    }
    let avg_time=sum/time_array.length;
    console.log("Time to mine  block:",time_diff,"ms","Difficulty:",current_block.difficulty,"Average Time:",avg_time,"ms");
}

// in haxadecimal  difficulty necver go up as much it should => highest difficulty =5 => any miner can easily creat new block easily and fastly generating their reward
// go website on hexadecimal to bit => 1xb23 ->0001
//  binary give many option to increse the difficulty => max difficulty =18
// difficulty 18 dificulty 5 now you can easily decide