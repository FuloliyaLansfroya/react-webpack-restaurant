/* eslint-disable jsx-a11y/anchor-is-valid */
import { Typography, Divider, List } from "antd";
import React from "react";
import { Link,withRouter } from "react-router-dom";
import axios from "../../interceptor";
import { content, store } from "../../utils/config";
const { Title, Paragraph, Text } = Typography;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      hasMore: true,
    };
  }
  componentDidMount() {
    const { type } = this.props;
    this.getList(type);
  }
  shouldComponentUpdate() {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      this.getList(type);
    }
    return null;
  }
  componentDidUpdate() {}
  getList = (type) => {
    axios({
      method: "get",
      url: type === "content" ? content : store,
    }).then((res) => {
      const { data } = res.data;
      const { list } = data;
      this.setState({
        list,
      });
    });
  };
  getContent = (type, list) =>
    type === "content" ? (
      <Typography style={{ backgroundColor: "white" }}>
        <Divider style={{ marginBottom: 0 }} />
        {list.map((value, index) => (
          <div key={index}>
            <Title
              style={{ marginTop: 0, marginLeft: 20, marginBottom: 40 }}
              level={2}
              ellipsis={true}
              underline={true}
            >
              <a style={{ color: "black" }}>{value.title}</a>
            </Title>
            <Paragraph style={{ marginLeft: 20 }}>{value.content}</Paragraph>
            <Divider />
          </div>
        ))}
      </Typography>
    ) : (
      <List
        style={{ backgroundColor: "white" }}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 0, marginLeft: 20, marginBottom: 40 }}>
            <List.Item.Meta
              title={
                <Link
                  to={{pathname:'/restaurant', state:{storeId:item.storeId}}}
                >{`店名 ：${item.storeName} —— 电话：${item.phone}`}</Link>
              }
              description={`介绍：${item.introduce}`}
            />
          </List.Item>
        )}
      />
    );
  render() {
    const { list } = this.state;
    const { type } = this.props;
    return this.getContent(type, list);
  }
}

export default withRouter(Contents);
