
Initial_difficulty =2;
//bitcoin mining_rate =10 minutes
Mining_rate =10000 //1000 mili second == 1 second    
const Geneis_data=
{
    nounce: 0,
    difficulty:Initial_difficulty,
    time_stamp:1,
    prev_hash:"0x000",
    hash:"0x123",
    data:"geneis_block"
}
module.exports ={ Geneis_data};