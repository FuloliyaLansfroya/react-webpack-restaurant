import React from "react";
import { Form, Row, Col, Input, Button } from "antd";
import axios from "../../interceptor";
import { store } from "../../utils/config";
import local from "../../utils/localStorage";
class CreateRestaurant extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (!local.wss.getItem("loginId") &&
      !local.wss.getItem("hash") &&
      local.wss.getItem("type") !== "admin") {
      window.location = "/"
    }
  }
  onFinish = (values) => {
    console.log(values);
    axios({
      method: "post",
      url: store,
      data: {
        values,
        id: local.wss.getItem("loginId"),
      }
    }).then((res) => {
      const { code } = res.data;
      if (code == "0") {
        window.location = "/"
      }

    })
  };
  render() {
    return (
      <Row style={{ paddingTop: 100 }}>
        <Col style={{ backgroundColor: "white", padding: 10 }} span={12} offset={6}>
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="storeName"
                  label="店名"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的店名",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入你的店名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="residence"
                  label="餐厅地址"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的餐厅地址",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入你的餐厅地址"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
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
                  <Input placeholder="请输入你的手机号" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="introduce"
                  label="餐厅介绍"
                  rules={[
                    {
                      required: true,
                      message: "请输入餐厅介绍",
                    },
                  ]}
                >
                  <Input.TextArea
                    maxLength={20}
                    rows={4}
                    placeholder="请输入餐厅介绍(20个字以内)"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              style={{
                textAlign: "right",
              }}
            >
              <Button
                onClick={this.closeWrite}
                style={{ marginRight: 8 }}
                htmlType="button"
              >
                Cancel
              </Button>
              <Button
                onClick={this.closeWrite}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default CreateRestaurant;
