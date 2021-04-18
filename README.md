## 项目类型

该项目为使用 react+node+mysql 制作的毕业设计项目--餐厅订餐系统。
使用此项目必须安装 node>6

## 项目结构：

# react: 项目的前端

public：index.html 和图标
src: 主目录
assert：图片
components:公用模块
interceptor: axios 拦截配置
mock: 伪后台 mock 数据
routes: 路由
static: 样式测试文件（已弃用）
templates: 主组件
utils: 通用方法封装和 loading 样式
index.jsx : 主入口

# server：项目的后端

admin: 后端服务主文件
config：Mysql 的配置项
cookie: 随机生成字符串方法
header: 跨域处理包装
mysql\_\*: 对应数据库的 node 方法包装
server: 数据分发系统

## 项目启动方式

# react

npm install 安装依赖项
npm start 启动项目 端口：3009

# server

npm install 安装依赖项
node admin 启动服务器 端口：4005
node server 启动数据分发系统 端口：3001

使用的技术：React+mock+ant+webpack
