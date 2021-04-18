import React, { Component } from "react";
import {
  PageHeader,
  Button,
  Tag,
  Row,
  Col,
  Card,
  List,
  Typography,
  Tabs,
  Modal,
} from "antd";
import PropTypes from "prop-types";
import { createHashHistory } from "history";
import { Link } from "react-router-dom";
import axios from "../../interceptor";
import local from "../../utils/localStorage";
import {shopping} from "../../utils/config";
import "../../mock/page"

const { TabPane } = Tabs;
const { Meta } = Card;
const history = createHashHistory();

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};


class DetailTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // 返回
  onBack = () => {
    history.go(-1);
  };

  // 展示模块
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 确认
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  // 取消
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  // 主内容
  content = () => {
    const { type, count, data } = this.props;
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            {type === "gourmet" ? (
              <Card
                bordered={false}
                cover={<img src={require("../../assert/1.png")} alt="" />}
              >
                <Meta title={data.dishName} description={data.introduce} />
              </Card>
            ) : (
                <></>
              )}
            {type === "drinkAdesert" ? (
              <Card
                bordered={false}
                cover={<img src={require("../../assert/1.jpg")} alt="" />}
              >
                <Meta title={data.dishName} description={data.introduce} />
              </Card>
            ) : (
                <></>
              )}
            {type === "scale" ? (
              <Card
                bordered={false}
                cover={
                  <img src={require(`../../assert/${count}.jpg`)} alt="" />
                }
              />
            ) : (
                <></>
              )}
            {type === "join" ? (
              <Card
                bordered={false}
                cover={<img src={require("../../assert/10.jpg")} alt="" />}
              />
            ) : (
                <></>
              )}
          </Col>
          <Col span={12}>
            {type === "gourmet" ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="配料详情" key="1">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>主料:</Typography.Text>
                      {data.main}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>配料:</Typography.Text>
                      {data.spice}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>油:</Typography.Text>
                      {data.oil}
                    </List.Item>
                  </List>
                </TabPane>
                <TabPane tab="价格详情" key="2">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>原价:</Typography.Text>
                      {data.price}元
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>现价:</Typography.Text>
                      {data.sellPrice}元
                    </List.Item>
                  </List>
                </TabPane>
              </Tabs>
            ) : (
                <></>
              )}
            {type === "drinkAdesert" ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="配料详情" key="1">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>主料:</Typography.Text>
                      {data.main}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>配料:</Typography.Text>
                      {data.seconds}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>甜度:</Typography.Text>
                      {data.sweet}
                    </List.Item>
                  </List>
                </TabPane>
                <TabPane tab="价格详情" key="2">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>原价:</Typography.Text>
                      {data.price}元
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>现价:</Typography.Text>
                      {data.sellPrice}元
                    </List.Item>
                  </List>
                </TabPane>
              </Tabs>
            ) : (
                <></>
              )}
            {type === "scale" ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="餐桌详情" key="1">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>名字:</Typography.Text>
                      {data.scaleName}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>介绍:</Typography.Text>
                      {data.introduce}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>剩余数量:</Typography.Text>
                      {data.surplus}桌
                    </List.Item>
                  </List>
                </TabPane>
                <TabPane tab="价格详情" key="2">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>原价:</Typography.Text>
                      {data.price}元
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>现价:</Typography.Text>
                      {data.sellPrice}元
                    </List.Item>
                  </List>
                </TabPane>
              </Tabs>
            ) : (
                <></>
              )}
            {type === "join" ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                  <List bordered>
                    <List.Item>
                      <Typography.Text mark>店名 :</Typography.Text>
                      {data.storeName}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>介绍 :</Typography.Text>
                      {data.introduce}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>电话 :</Typography.Text>
                      {data.phone}
                    </List.Item>
                    <List.Item>
                      <Typography.Text mark>居住地 :</Typography.Text>
                      {data.residence}
                    </List.Item>
                  </List>
                </TabPane>
              </Tabs>
            ) : (
                <></>
              )}
          </Col>
        </Row>
      </>
    );
  };

  // 购物车页面
  onShop = () => {
    let { data,type } = this.props;
    console.log(data,type)
    axios({
      method: "POST",
      url: shopping,
      data: {
        data,
        type,
        storeId: local.wls.getItem("storeId"),
      },
    }).then((res) => {
      // const { code, data } = res.data;
      console.log(res)
      // const {list} =data;
      // if (code === "0") {
      //   this.setState({
      //     list:list[0],
      //   });
      // }
    });
  }

  // 按钮属性
  getBtn = (type) => {
    if (type === "gourmet" || type === "drinkAdesert") {
      return [
        <Button key="2" onClick={this.onShop}>
          加入购物车
        </Button>,
        <Button key="1" type="primary" onClick={this.showModal}>
          购买
        </Button>,
      ];
    }
    if (type === "scale") {
      return [
        <Button key="1" type="primary" onClick={this.showModal}>
          预定
        </Button>,
      ];
    }
    if (type === "join") {
      return [
        <Button key="1" type="primary" onClick={this.showModal}>
          <Link to="/restaurant/join/joinForm"> 加盟</Link>
        </Button>,
      ];
    }
  };

  // 弹窗属性
  modalSlot = (type) => {
    const { data } = this.props;
    if (type === "gourmet" || type === "drinkAdesert") {
      return (
        <>
          <p>
            这个菜的价格为
            <span style={{ fontSize: 26, color: "red" }}>
              {data.sellPrice}元
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
    }
    if (type === "scale") {
      return (
        <>
          <p>
            这个位置的价格为
            <span style={{ color: "red" }}>{data.sellPrice}</span>元
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
    }
  };

  render() {
    let { type, data } = this.props;
    const { visible } = this.state;
    return (
      <>
        <PageHeader
          title={data.dishName}
          onBack={
            type === "gourmet" || type === "drinkAdesert" ? this.onBack : null
          }
          className="site-page-header"
          style={{ backgroundColor: "white" }}
          tags={<Tag color="blue">Running</Tag>}
          extra={this.getBtn(type)}
        >
          <Content>{this.content()}</Content>
        </PageHeader>
        {
          type === 'join' ? "" : (
            <Modal
              title="购买"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {this.modalSlot(type)}
            </Modal>
          )
        }
      </>
    );
  }
}

DetailTop.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

DetailTop.defaultProps = {
  count: "0",
};

export default DetailTop;
