import React, { Component } from "react";
import Cards from "../../../components/Cards";
import axios from "../../../interceptor";
import getType from '../../../utils/type';
import {drinkAdesert} from '../../../utils/config'
import local from '../../../utils/localStorage'
import { Tabs } from "antd";

const { TabPane } = Tabs;

class DrinkAdesert extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      list: [],
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: drinkAdesert,
      params:{
        storeId:local.wls.getItem("storeId")
      }
    }).then((res) => {
      const { code, data } = res.data;
      const { list } = data;
      if (code === "0") {
        this.setState({
          list,
        });
      }
    });
  }

  callback(key) {
    console.log(key);
  }

  render() {
    const { list } = this.state;
    return (
      <>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="饮品" key="1">
            <Cards list={getType("饮品", list)} span={8} type="drinkAdesert" />
          </TabPane>
          <TabPane tab="甜点" key="2">
            <Cards list={getType("甜点", list)} span={8} type="drinkAdesert" />
          </TabPane>
          <TabPane tab="酒" key="3">
            <Cards list={getType("酒", list)} span={8} type="drinkAdesert" />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default DrinkAdesert;
