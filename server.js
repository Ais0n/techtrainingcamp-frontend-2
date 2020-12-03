const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

var playerNum = 0;
var players = new Map();
var playerID = 0;
var playerScore = new Map();
var maxScore = 0;
var finished = 0;

// 一个简单的demo，假设服务器只有两个人连接
wss.on('connection', function connection(ws) {
  playerNum++;
  console.log("new paler connected, now we have ", playerNum, " palers");
  //console.log(wss.clients)
  // 消息处理函数

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const data = JSON.parse(message);
    if (data.type === "initGame") {
      //接收到玩家开始游戏请求
      console.log(data);
      if (data.id === -1) {
        //新玩家
        players.set(playerID, { nickame: new String(data.name) });
        console.log("收到玩家请求，分配id为： ", playerID);
        data.id = playerID;
        ws.id = playerID;
        playerID++;
      }
      // 将消息广播出去
      // 如果players内有其它玩家，则可以开始游戏
      if (players.size > 1) {
        const oppoentId = Array.from(players.keys()).filter(id => id !== data.id)[0];;
        const opponet = players.get(oppoentId);
        const opponetData = {
          type: "initGame",
          name: opponet.nickame,
          id: oppoentId,
        }
        ws.send(JSON.stringify(opponetData));
      }
      //只有一个人 等待匹配
      else {
        data.type = "waiting";
        ws.send(JSON.stringify(data));
      }
    }
    // 游戏进行中
    if (data.type === "gaming") {
      if(data.score>maxScore)maxScore=data.score;
      console.log("maxscore:", maxScore);
      playerScore[ws.id]=data.score;
      // 将消息广播出去
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
          console.log("send message ", message);
        }
      });
    }
    //游戏结束
    if (data.type == "finished") {
      finished++;
      if (finished == 2) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            var data;
            if(playerScore[client.id] >= maxScore){
              data = {
                type: "end",
                win: true
              }
            }
            else{
              data = {
                type: "end",
                win: false
              }
            }
            client.send(JSON.stringify(data));
            console.log("playerScore ", playerScore[client]);
            console.log("maxScore", maxScore);
            console.log("send message ", data);
          }
        });
      }
    }
  });
  //切断连接
  ws.on('close', function close() {
    playerNum--;
    //players.delete(ws.id);
    console.log("one player leave, now we have ", playerNum, " palers")
    players.delete(ws.id);
    console.log(players);
  });
});

