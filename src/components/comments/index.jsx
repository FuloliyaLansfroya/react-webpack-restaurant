import { Comment, Avatar, List, Form, Input, Button } from "antd";
import axios from "../../interceptor";
import moment from "moment";
import React from "react";
import { addComments, comments } from "../../utils/config";
import local from "../../utils/localStorage";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Comments = ({ children }, author, content, datatime) => (
  <Comment
    actions={<span key="comment-list-reply-to-0">Reply to</span>}
    author={author}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={content}
    datetime={datatime}
  >
    {children}
  </Comment>
);

class ListComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      comments: [],
      submitting: false,
      value: "",
    };
  }
  handleSubmit = () => {
    const { value, list } = this.state;
    if (!value) {
      return;
    }
    const comment = {
      author: "Han Solo",
      content: value,
      datetime: moment().fromNow(),
      dishId: "123223",
    };
    this.setState({
      submitting: true,
    });

    axios({
      method: "post",
      url: addComments,
      data: {
        comment,
        storeId: local.wls.getItem("storeId"),
      },
    }).then((res) => {
      const { data } = res.data;
      list.push(data);
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: "",
          list,
        });
      }, 1000);
    });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  getComment = () => {
    axios({
      method: "post",
      url: comments,
      data: {
        dishId: "",
        storeId: local.wls.getItem("storeId"),
      },
    }).then((res) => {
      const { code, data } = res.data;
      const { list } = data;
      this.setState({
        list,
      });
    });
  };
  componentDidMount() {
    this.getComment();
  }
  render() {
    const { submitting, value } = this.state;
    let { list } = this.state;
    return (
      <div>
        <List
          className="comment-list"
          header={`${list.length} 评论`}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <li>{Comments({}, item.author, item.content, item.datetime)}</li>
          )}
        />
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default ListComment;
