# Blockchain_in_js
### Requirements

<!-- npm i redis@2.8.0

npm i express --save 

npm i nodemon --save-dev 

npm i body-parser --save

npm i cross-env@5.2.0 --save-dev

npm i request@2.88.0 --save

npm i hex-to-binary@1.0.1 --save -->

### redis-server should be running in Background
![image](https://user-images.githubusercontent.com/73174196/211002345-a58fab38-c0fc-4fe6-ab36-9f582e949eac.png)

commands : 
/etc/init.d/redis-server {start|stop|restart|force-reload|status}    ,    sudo systemctl status redis status

### How to run?
npm run dev           ->  listening to port : 3000

npm run dev-peer      ->  listening to port : 3000 + 1000*(random_number)     eg.. 3806 

if you want more peer/nodes in Blockchain -> open new terminal and run  "npm run dev-peer" again 


![image](https://user-images.githubusercontent.com/73174196/211002783-b0955ec3-b677-475f-98bd-16d896b593c9.png)


### How to mine the Block?
using Postman 
![image](https://user-images.githubusercontent.com/73174196/211002916-c5295aed-205b-4269-aee0-540bfc62fb84.png)

### Average time to mine the block
![image](https://user-images.githubusercontent.com/73174196/211003791-9879d9b0-58c8-4d58-9c1d-8acb71d0ca53.png)

