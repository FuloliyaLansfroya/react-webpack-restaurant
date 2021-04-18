function getHeader(str, app) {
  app.all(str, function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "http://localhost:3009");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
}
module.exports = getHeader;
