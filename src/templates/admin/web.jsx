import Socket from "../../utils/dds";
import React from "react";
import { Input, Button, Form } from "antd";
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

class web extends React.Component {
  constructor() {
    super();
  }
  onFinish = (values) => {
    console.log(values);
    this.socket.sendMessage({ values }); //调用WebSocket send()发送信息的方法
  };
  componentDidMount = () => {
    //    判断专家是否登录
    this.socket = new Socket({
      socketUrl: "ws://localhost:3001",
      socketMessage: (receive) => {
        console.log(receive); //后端返回的数据，渲染页面
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
  render() {
    return (
      <Form name="control-ref" onFinish={this.onFinish} {...layout}>
        <Form.Item name="allMsg" label="全局广播">
          <TextArea placeholder="信息" autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name="username" label="用户单独广播">
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="msg" {...tailLayout}>
          <TextArea placeholder="消息" autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            发送
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default web;
