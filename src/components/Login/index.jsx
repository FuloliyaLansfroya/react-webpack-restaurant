import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React from "react";
import axios from "../../interceptor";
import { login } from "../../utils/config";
import local from "../../utils/localStorage";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "1",
      flag: false,
      type: "",
      loading: false,
    };
  }
  onFinish = (values) => {
    console.log(values)
    axios({
      method: "post",
      url: login,
      data: {
        userName: values.username,
        passWord: values.password,
      },
    })
      .then((res) => {
        const { data, code, msg, hash } = res.data;
        const { list } = data;
        console.log(list[0])
        const newData= list[0]
        const { type, username ,id,password} = newData;
        console.log(id)
        this.setState({
          msg,
          type: type,
          loading: true,
        })
        if (code === "0") {
          local.wss.setItem("username", username)
          local.wss.setItem("password", password)
          local.wss.setItem("loginId", id)
          local.wss.setItem("hash", hash)
          local.wss.setItem("type", type)
          this.setState({
            flag: true
          });
          setTimeout(() => {
            window.location = "/"
          }, 1000);
        } else {
          this.setState({
            loading: false,
            flag: false
          })
        }


      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    let { msg, flag, loading } = this.state;
    return (
      <Form
        name="normal_login"
        className="login-form log"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入你的用户名",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            忘记密码
            </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            登录
            </Button>
            或 <Link to="/register">注册</Link>
          <div className={flag ? "alert" : "alert active"}>{msg}</div>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
