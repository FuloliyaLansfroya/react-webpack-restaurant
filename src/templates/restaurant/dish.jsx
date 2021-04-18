import React, { Component } from "react";
import DetailTop from "../../components/detailTop";
import ListComment from "../../components/comments";
import { Divider } from "antd";
import PropTypes from "prop-types";
import { dish } from "../../utils/config";
import axios from "../../interceptor";
import local from "../../utils/localStorage";
import "../../mock/gourmet";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
    };
  }

  componentDidMount() {
    this.asyncDi();
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.count !== match.params.count) {
      this.asyncDi();
    }
  }

  // 根据类型请求数据
  asyncDi = () => {
    const { match } = this.props; 
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
      const newData = list[0]
      if (code === "0") {
        this.setState({
          data:newData,
        });
      }
    });
  };

  render() {
    const { match } = this.props;
    const { data } = this.state;
    return (
      <>
        <DetailTop
          type={match.params.type}
          count={match.params.count}
          data={data}
        />
        <Divider orientation="left">评论</Divider>
        <ListComment />
      </>
    );
  }
}

Dish.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Dish;
