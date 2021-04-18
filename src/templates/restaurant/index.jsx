import React from "react";
import { Layout, Breadcrumb, Badge, Popover, Empty, List } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import routers from "../../routes";
import { BellTwoTone } from "@ant-design/icons";
import { flattenRouters } from "../../utils";
import Siders from "../../components/sider";
import Socket from "../../utils/dds";
import "./index.css";
import "../../mock/gourmet";
import "../../mock/drinkAdesert";
import "../../mock/page";
import axios from "../../interceptor";
import { message, store,user } from "../../utils/config";
import local from "../../utils/localStorage";
const { Header } = Layout;
const routes = flattenRouters(routers);

const text = <span>个人消息</span>;

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const match = pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {match.map((value, index) => {
        const to = `/${match.slice(0, index + 1).join("/")}`;
        const menu = routes.find((m) => m.path === to);
        return (
          <Breadcrumb.Item key={to}>{menu ? menu.name : value}</Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

const Content = (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        render={({ match }) => <route.component match={match} />}
        exact
      />
    ))}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 0,
    };
  }
  closeMsg = () => {};
  getContent = (list) => (
    <div>
      {list.length === 0 ? (
        <Empty description={false} style={{ width: 336 }} />
      ) : (
        <List
          bordered
          className="res-header"
          style={{ width: 336, maxHeight: 475, overflowY: "scroll" }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={this.closeMsg}>{item.msg}</List.Item>
          )}
        />
      )}
    </div>
  );
  setList = () => {
    axios({
      method: "get",
      url: message,
    })
      .then((res) => {
        const { data } = res.data;
        const { list } = data;
        const len = [];
        list.map((value, index) => {
          if (
            data.username !== undefined &&
            data.username !== "" &&
            data.msg !== undefined &&
            data.msg !== ""
          ) {
            len.push({ username: value.username, msg: value.msg });
          }
        });
        this.setState({
          list: len,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    if(!local.wss.getItem("loginId") &&
    !local.wss.getItem("hash")){
      window.location="/"
    }
    this.getUser()
    this.setList();
    const { list } = this.state;
    //    判断专家是否登录
    this.socket = new Socket({
      socketUrl: "ws://localhost:3001",
      socketMessage: (receive) => {
        console.log(JSON.parse(receive.data)); //后端返回的数据，渲染页面
        const data = JSON.parse(receive.data);
        if (
          data.username !== undefined &&
          data.username !== "" &&
          data.msg !== undefined &&
          data.msg !== ""
        ) {
          list.push({
            username: data.username,
            msg: data.msg,
          });
          this.setState({
            list,
            count: list.length,
          });
        }
      },
      socketClose: (msg) => {
        console.log(msg);
      },
      socketError: () => {
        console.log(this.state.taskStage + "连接建立失败");
      },
      socketOpen: () => {
        console.log("连接建立成功");
      },
    });
    // 重试创建socket连接;
    try {
      this.socket.connection();
    } catch (e) {
      // 捕获异常，防止js error
      // donothing
    }
  };
  getUser = ()=>{
    axios({
      method:"post",
      url:user,
      data:{
        id:"13"
      }
    }).then((res)=>{
      console.log(res)
    })
  }
  render() {
    const { list, count } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { storeId } = state;
    console.log(storeId);
    local.wls.setItem("storeId", storeId);

    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Siders storeId={storeId} />
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: 0, background: " #fff", height: 48 }}
            >
              <div
                style={{ display: "flex", height: "100%", padding: "0 16px" }}
              >
                <div style={{ flex: "1 1 0%" }}></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Popover
                    placement="bottomRight"
                    title={text}
                    content={this.getContent(list)}
                    trigger="click"
                  >
                    <span className="pro-action">
                      <Badge count={count} size="small" overflowCount={99}>
                        <span style={{ padding: 4, verticalAlign: "middle" }}>
                          <BellTwoTone />
                        </span>
                      </Badge>
                    </span>
                  </Popover>

                  <span className="log-in">
                    <img
                      className="log-img"
                      src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                      alt="avater"
                    />
                  </span>
                  <span>{local.wss.getItem("username")}</span>
                </div>
              </div>
            </Header>
            <Layout.Content style={{ margin: "0 16px" }}>
              <Breadcrumbs />
              {Content}
            </Layout.Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
