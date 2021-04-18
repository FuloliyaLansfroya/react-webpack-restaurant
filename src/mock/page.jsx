/* eslint-disable no-unused-vars */
import Mock from "mockjs";
import moment from "moment";
const login = Mock.mock(/\/test.com\/login/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  if (match.userName !== "admin" || match.passWord !== "123456") {
    return Mock.mock({
      code: "1",
      data: {},
      msg: "用户不存在或密码不正确",
    });
  } else {
    return Mock.mock({
      code: "0",
      type: 0,
      hash: "123456",
      msg: "登录成功",
    });
  }
});
const register = Mock.mock(/\/test.com\/register/, "post", (options) => {
  const { body } = options;
  const { values } = JSON.parse(body);
  const agreement = values.agreement;
  const confirm = values.confirm;
  const email = values.email;
  const nickname = values.nickname;
  const password = values.password;
  const phone = values.phone;
  const prefix = values.prefix;
  const residence = values.residence;
  console.log(
    agreement,
    confirm,
    email,
    nickname,
    password,
    phone,
    prefix,
    residence
  );

  return Mock.mock({
    code: "0",
    data: {},
    msg: "注册成功",
  });
});

const comments = Mock.mock(/\/test.com\/comments/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  console.log(match);
  return Mock.mock({
    code: "0",
    data: {
      "list|5": [
        {
          author: "@cname",
          content: "@cparagraph(1)",
          datetime: moment().fromNow(),
        },
      ],
    },
    msg: "success",
  });
});

const addComments = Mock.mock(/\/test.com\/addComments/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  const { comment } = match;
  return Mock.mock({
    code: "0",
    data: {
      author: comment.author,
      content: comment.content,
      datetime: comment.datetime,
    },
    msg: "success",
  });
});

const postPage = Mock.mock(/\/test.com\/page/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  // eslint-disable-next-line no-unused-vars
  console.log(match);
  return Mock.mock({
    code: "0",
    msg: "success",
  });
});
const getPage = Mock.mock(/\/test.com\/page/, "get", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  console.log(match);
  return Mock.mock({
    code: "0",
    data: {
      "list|5": [
        {
          "key|+1": 1,
          name: `@cname`,
          price: "@integer(10,200)",
          type: match.type,
        },
      ],
    },
    msg: "success",
  });
});
const deletePage = Mock.mock(/\/test.com\/page/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  console.log(match);
  return Mock.mock({
    code: "0",
    msg: "success",
  });
});
const join = Mock.mock(/\/test.com\/join/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  console.log(match);
  return Mock.mock({
    code: "0",
    msg: "success",
  });
});

const User = Mock.mock(/\/test.com\/user/, "post", (options) => {
  const { body } = options;
  const match = JSON.parse(body);
  console.log(match);
  return Mock.mock({
    code: "0",
    data: {
      list: [
        {
          introduce: " 练习时长两年半的个人练习生",
          username: '@cname',
          type: "普通人",
        }
      ]
    },
    msg: "success",
  });
});

const Content = Mock.mock(/\/test.com\/content/, ({
  code: "0",
  data: {
    "list|10": [
      {
        title: "@ctitle(3, 5)",
        content: "@cparagraph(10)",
      }
    ]
  },
  msg: "success",
})
);
export { login, register, comments, addComments, postPage, getPage, join, User, Content };
