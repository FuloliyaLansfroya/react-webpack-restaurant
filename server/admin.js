const express = require("express");
const app = express();
const sqlDrink = require("./mysql_drink");
const sqlGroumets = require("./mysql_groumets");
const sqlShop = require("./mysql_shop");
const sqlStaff = require("./mysql_staff");
const sqlLog = require("./mysql_log");
const sqlContent = require("./mysql_content");
const sqlComment = require("./mysql_comment");
const sqlMessage = require("./mysql_message");
const sqlJoin = require("./mysql_join");
const bodyParser = require("body-parser");
const getHeader = require("./header");
const cookies = require("./cookie").cookieControl;
var cookiess = new cookies();
const crypto = require("crypto");
const { json } = require("body-parser");

getHeader("/drinkAdesert", app);
getHeader("/gourmet", app);
getHeader("/store", app);
getHeader("/dish", app);
getHeader("/shopping", app);
getHeader("/staff", app);
getHeader("/login", app);
getHeader("/register", app);
getHeader("/comments", app);
getHeader("/addComments", app);
getHeader("/join", app);
getHeader("/user", app);
getHeader("/content", app);
getHeader("/message", app);
getHeader("/changeUser", app);

app.get("/drinkAdesert", function (req, res) {
  const { query } = req;
  const { storeId } = query;
  let sql1 = `select * from drinkDesert where storeId = '${storeId}'`;
  sqlDrink(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/drinkAdesert", bodyParser.json(), function (req, res) {
  const { body } = req;
  console.log(req)
  const { list, storeId } = body;
  const {
    type,
    introduce,
    dishName,
    price,
    sellPrice,
    main,
    seconds,
    sweet,
  } = list;
  console.log(list, storeId);
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql1 = `insert into drinkDesert values (
    "${str}","${dishName}","${introduce}",
    ${price},${sellPrice},"${main}",
    "${seconds}","${sweet}","${type}","${storeId}"
    );`;
  sqlDrink(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.get("/gourmet", function (req, res) {
  const { query } = req;
  const { storeId } = query;
  let sql1 = `select * from groumet where storeId = '${storeId}'`;
  sqlGroumets(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/gourmet", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { list, storeId } = body;
  const {
    type,
    introduce,
    dishName,
    price,
    sellPrice,
    main,
    spice,
    oil,
  } = list;
  console.log(list, storeId);
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql1 = `insert into groumet values (
    "${str}","${dishName}","${introduce}",
    ${price},${sellPrice},"${main}",
    "${spice}","${oil}","${type}","${storeId}"
    );`;
  sqlGroumets(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.get("/store", function (req, res) {
  sql = `select * from store;`;
  sqlGroumets(sql, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});
app.post("/store", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { values, id } = body
  console.log(body)
  const { storeName, residence, phone, introduce } = values;
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql = `insert into store values ("${str}","${storeName}","${introduce}","${phone}","${residence}");`;
  let sql2 = `update login set storeId="${str}" where id="${id}"`
  sqlLog(sql2, null, function (list_log) {
    sqlGroumets(sql, null, function (list) {
      res.send({
        code: "0",
        data: { list },
        msg: "操作成功",
      });
    });
  });
});

app.post("/dish", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { match, storeId } = body;
  const { params } = match;
  console.log(body)
  const { type, id, count } = params;
  let sql = "";
  switch (type) {
    case "gourmet":
      sql = `select * from groumet where id=${id} and storeId=${storeId};`;
      sqlGroumets(sql, null, function (list) {
        res.send({
          code: "0",
          data: { list },
          msg: "操作成功",
        });
      });
      break;
    case "drinkAdesert":
      sql = `select * from drinkDesert where id=${id} and storeId=${storeId};`;
      sqlDrink(sql, null, function (list) {
        res.send({
          code: "0",
          data: { list },
          msg: "操作成功",
        });
      });
      break;
    case "scale":
      sql = `select * from scale where type =${count} and storeId=${storeId};`;
      sqlGroumets(sql, null, function (list) {
        res.send({
          code: "0",
          data: { list },
          msg: "操作成功",
        });
      });
      break;
    case "store":
      sql = `select * from store where storeId=${storeId};`;
      sqlGroumets(sql, null, function (list) {
        res.send({
          code: "0",
          data: { list },
          msg: "操作成功",
        });
      });
      break;
  }
});

app.get("/shopping", function (req, res) {
  const { query } = req;
  const { storeId } = query;
  let sql1 = `select * from shopping where storeId = "${storeId}"`;
  sqlShop(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/shopping", bodyParser.json(), function (req, res) {
  const { data, storeId, type } = req.body;
  const { id, dishName, introduce, sellPrice } = data;
  let sql1 = `insert into shopping values ("${id}","${dishName}","${introduce}",${sellPrice},"${type}","${storeId}");`;
  sqlShop(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/staff", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { match, storeId, id } = body;
  const { params } = match;
  const { identity } = params;
  let sql1 = `select * from staffs where identity='${identity}' and storeId = "${storeId}"; `;


  sqlStaff(sql1, null, function (list) {
    console.log(list);
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  })


});

app.post("/user", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { id } = body;
  let sql1 = `select * from login where id="${id}"`;
  sqlLog(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});
app.post("/changeUser", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { id, values } = body;
  const { username, email, introduce, phone } = values
  console.log(body)
  let sql1 = `update login set username="${username}",email="${email}",introduce="${introduce}",phone="${phone}" where id="${id}"`
  sqlLog(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/login", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { userName, passWord } = body;
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql1 = `select * from login where username='${userName}' and password = '${passWord}'; `;
  sqlLog(sql1, null, function (list) {
    if (list.length === 0) {
      res.send({
        code: "1",
        data: {},
        msg: "用户不存在或密码不正确",
      });
    } else {
      res.send({
        code: "0",
        data: { list },
        hash: str,
        msg: "登录成功",
      });
    }
  });
});

app.post("/register", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { values } = body;
  const introduce = "这个人很懒,什么都没写"
  console.log(body)
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  const { username, password, email, phone, type } = values;
  let sql1 = `insert into login(id,username,password,type,email,phone,introduce) values ("${str}","${username}","${password}","${type ? "admin" : "general"
    }","${email}","${phone}","${introduce}");`;
  sqlLog(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.get("/comments", function (req, res) {
  const { query } = req;
  const { storeId } = query
  let sql1 = `select * from commented where storeId = "${storeId}"`;
  sqlComment(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/comments", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { dishId, storeId } = body;
  let sql1 = `select * from commented where dishId="${dishId}" and storeId="${storeId}" ; `;
  sqlComment(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/addComments", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { comment, storeId } = body;
  const { author, content, datetime, dishId } = comment;
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql1 = `insert into commented values ("${str}","${author}","${content}","${datetime}","${dishId}","${storeId}");`;
  sqlComment(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "插入成功",
    });
  });
});

app.get("/join", function (req, res) {
  const { query } = req;
  const { storeId } = query;
  let sql1 = `select * from joins where storeId = "${storeId}"`;
  sqlJoin(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/join", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { values, storeId } = body;
  console.log(storeId);
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  const { name, age, email, phone, introduce } = values;
  let sql1 = `insert into joins values ("${str}","${name}","${age}","${email}","${phone}","${introduce}","${storeId}");`;
  sqlJoin(sql1, null, function () {
    res.send({
      code: "0",
      data: {},
      msg: "操作成功",
    });
  });
});

app.get("/content", function (req, res) {
  let sql1 = ` select * from content;`;
  sqlContent(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.post("/content", bodyParser.json(), function (req, res) {
  const { body } = req;
  const { values } = body
  const { author, title, owner, content, datetime } = values;
  console.log(body)
  let y = cookiess.getToken();
  let str = crypto.createHash("md5").update(y).digest("hex");
  let sql1 = `insert into content values ("${str}","${author}","${title}","${owner}","${content}","${datetime}")`;
  sqlContent(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.get("/message", function (req, res) {
  let sql1 = `select * from message`;
  sqlMessage(sql1, null, function (list) {
    res.send({
      code: "0",
      data: { list },
      msg: "操作成功",
    });
  });
});

app.listen(4005, () => {
  console.log(4005);
});
