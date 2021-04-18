import React, { Component } from "react";
import DetailTop from "../../../components/detailTop";
import axios from "../../../interceptor";
import {dish} from '../../../utils/config'
import local from "../../../utils/localStorage";
class Join extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  getData=()=>{
    const match ={params:{type: "store"}}
    axios({
      method: "POST",
      url: dish,
      data: {
        match,
        storeId: local.wls.getItem("storeId"),
      },
    }).then((res) => {
      const { code, data } = res.data;
      const {list} =data;
      console.log(data)
      const newData = list[0]
      if (code === "0") {
        this.setState({
          data:newData,
        });
      }
    });
  }
  componentDidMount() {
   this.getData()
  }

  render() {
    const {data} =this.state;
    return (
      <>
        <DetailTop type="join"  data={data} />
      </>
    );
  }
}

export default Join;
