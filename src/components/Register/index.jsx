import React from "react";
import { Form, Input, Cascader, Select, Checkbox, Button } from "antd";
import axios from "../../interceptor";
import { register } from "../../utils/config";
import './index.less'
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
class RegistrationForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      code: "",
      loading: false,
      flag: false,
    };
  }
  onFinish = (values) => {
    console.log(values)
    axios({
      method: "post",
      url: register,
      data: {
        values,
      },
    }).then((res) => {
      const { data } = res;
      const { msg, code } = data;
      this.setState({
        msg,
        code,
        loading: true,
      });
      if (code === "0") {
        setTimeout(() => {
          this.setState({
            flag:true
          });
          window.location="/"
        }, 1000);
      }else{
        this.setState({
          loading: false,
          flag:false,
        });
      }
    });
  };
  render() {
    const { loading ,flag,msg} = this.state;
    return (
      <Form
        {...formItemLayout}
        ref={this.formRef}
        className="reg"
        name="register"
        onFinish={this.onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "请输入正确的邮箱",
            },
            {
              required: true,
              message: "请输入你的邮箱",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入你的密码",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="再次输入密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请再次输入你的密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("两次密码不一致")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label="用户名"
          tooltip="你的登录名"
          rules={[
            {
              required: true,
              message: "请输入你的用户名",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
              message: "请输入你的手机号",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="type"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>
            我是餐厅负责人
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            注册
          </Button>
          <div className={flag ? "alert" : "alert active"}>{msg}</div>
        </Form.Item>
      </Form>
    );
  }
}
export default RegistrationForm;
