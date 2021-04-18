import React from "react";
import { Form, Input, Cascader, Select, Checkbox, Button, Radio } from "antd";
import axios from "../../interceptor";
import { join } from "../../utils/config";
import local from "../../utils/localStorage";
import { withRouter } from "react-router-dom";
import './index.less'
const { TextArea } = Input;
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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
class JoinForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      loading: false,
    };
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios({
      method: "post",
      url: join,
      data: {
        values,
        storeId:local.wls.getItem("storeId")
      },
    }).then((res) => {
      const { data } = res;
      const { msg, code } = data;
      this.setState({
        msg,
        loading: true
      });
      if (code === "0") {
        setTimeout(() => {
          this.props.history.push("/restaurant/join");
        }, 1000);
      }
    });
  };
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  render() {
    const { loading } = this.state
    return (
      <Form
        {...formItemLayout}
        ref={this.formRef}
        name="register"
        className="joinForm"
        onFinish={this.onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[
            {
              required: true,
              message: "Please select your sex!",
              whitespace: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="residence"
          label="Residence"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={this.prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="introduce"
          label="Introduce"
          rules={[
            {
              required: true,
              message: "Please input your introduce!",
              whitespace: true,
            },
          ]}
        >
          <TextArea rows={4} autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default withRouter(JoinForm);
