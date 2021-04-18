import React, { Component } from "react";
import Cards from "../../../components/Cards";
import axios from "../../../interceptor";
import "../../../mock/shopping";
import { Row, Col, Button, Divider, Space, Modal, Tabs } from "antd";
import { shopping } from "../../../utils/config";
import local from "../../../utils/localStorage";
const { TabPane } = Tabs;

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: shopping,
      params: {
        storeId: local.wls.getItem("storeId"),
      },
    }).then((res) => {
      const { code, data } = res.data;
      const { list } = data;
      console.log(list)
      if (code === "0") {
        this.setState({
          list,
        });
      }
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  getAllPrice = (list) => {
    let price = 0;
    list.map((item) => {
      price += item.price;
      return null;
    });
    return price;
  };

  modalSlot = () => {
    const { list } = this.state;
    return (
      <>
        <p>
          所有菜的价格为
          <span style={{ fontSize: 26, color: "red" }}>
            {this.getAllPrice(list)}元
          </span>
          元
        </p>
        <p>请选择支付方式</p>
        <Tabs defaultActiveKey="1">
          <TabPane tab="微信支付" key="1">
            微信支付
          </TabPane>
          <TabPane tab="支付宝支付" key="2">
            支付宝支付
          </TabPane>
        </Tabs>
      </>
    );
  };

  render() {
    const { list } = this.state;
    const slot = (
      <>
        <Button>删除</Button>
        <Divider></Divider>
      </>
    );
    return (
      <>
        <Row style={{ maxHeight: 700 }}>
          <Col span={24}>
            <Cards list={list} slot={slot} span={7} type="shopping" />
            <Space>
              总价:
              <span style={{ fontSize: 26, color: "red" }}>
                {this.getAllPrice(list)}元
              </span>
              <Button type="primary" onClick={this.showModal}>
                支付
              </Button>
            </Space>
          </Col>
        </Row>
        <Modal
          title="支付"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.modalSlot()}
        </Modal>
      </>
    );
  }
}

export default Shopping;
