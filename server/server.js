const sqlMessage = require("./mysql_message");
var chatList = []; //记录聊天记录
var WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 3001 }); //8181 与前端相对应
//调用 broadcast 广播，实现数据互通和实时更新
wss.broadcast = function (msg) {
  wss.clients.forEach(function each(client) {
    client.send(msg);
  });
};
wss.on("connection", function (ws) {
  console.log("连接已建立")
  //接收前端发送过来的数据
  ws.on("message", function (e) {
    var resData = JSON.parse(e);
    const { values } = resData;
    const { allMsg, username, msg } = values;
    console.log(
      "接收到来自clent的消息：" +
        "all:" +
        allMsg +
        " username:" +
        username +
        " msg:" +
        msg
    );
    chatList.push({ allMsg, username, msg }); //每次发送信息，都会把信息存起来，然后通过广播传递出去，这样此每次进来的用户就能看到之前的数据
    wss.broadcast(JSON.stringify({ allMsg, username, msg })); //每次发送都相当于广播一次消息
    let sql1 = `insert into message values ("${allMsg}","${username}","${msg}")`;
    sqlMessage(sql1, null, function (list) {
      console.log("存储完成");
    });
    
  });
  ws.on("close", function (e) {
    console.log("长连接已关闭");
  });
});
console.log("服务器创建成功");
