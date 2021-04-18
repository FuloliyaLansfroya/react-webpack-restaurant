import Mock from "mockjs";

const gourmet = Mock.mock(/\/test.com\/gourmet/, {
  code: "0",
  data: {
    "list|5": [
      {
        "id|+1": 1,
        dishName: "@cname",
        introduce: "@cparagraph(1)",
        price: "@natural(1,100)",
        "type|1": [1, 2, 3],
      },
    ],
  },
  msg: "操作成功",
});

const dish = Mock.mock(/\/test.com\/dish/, "post", (options) => {
  const { body } = options;
  const { match } = JSON.parse(body);
  if (match.params.type === "gourmet") {
    return Mock.mock({
      code: "0",
      data: {
        main: "@cparagraph(1)",
        spice: "@cparagraph(1)",
        oil: "花生油",
        id: match.params.id,
        dishName: "@cname",
        introduce: "@cparagraph(1)",
        price: "@natural(1,100)",
        sellPrice: "@natural(1,100)",
        simaller: "@natural(1,10)",
      },
      msg: "操作成功",
    });
  }
  if (match.params.type === "drinkAdesert") {
    return Mock.mock({
      code: "0",
      data: {
        main: "@cparagraph(1)",
        seconds: "@cparagraph(1)",
        sweet: "微甜",
        id: match.params.id,
        dishName: "@cname",
        introduce: "@cparagraph(1)",
        price: "@natural(1,100)",
        sellPrice: "@natural(1,100)",
        simaller: "@natural(1,10)",
      },
      msg: "操作成功",
    });
  }
  if (match.params.type === "scale") {
    return Mock.mock({
      code: "0",
      data: {
        introduce: "@cparagraph(1)",
        remain: "@natural(1,30)",
        id: match.params.count,
        dishName: "@cname",
        price: "@natural(1,100)",
        sellPrice: "@natural(1,100)",
      },
      msg: "操作成功",
    });
  }
  if (match.params.type === "store") {
    return Mock.mock({
      code: "0",
      data: {
        storeId: "@id",
        storeName: "@cname",
        introduce: "@cparagraph(1)",
        Phone: "@id",
        residence: "@cparagraph(1)",
      },
      msg: "操作成功",
    });
  }
});

const joins = Mock.mock(/\/test.com\/store/,"get", {
  code: "0",
  data: {
    list: [
      {
        storeId: "@id",
        storeName: "@cname",
        introduce: "@cparagraph(1)",
        tel: "@id",
        live: "@cparagraph(1)",
      },
      {
        storeId: "@id",
        storeName: "@cname",
        introduce: "@cparagraph(1)",
        tel: "@id",
        live: "@cparagraph(1)",
      },
    ],
  },
  msg: "操作成功",
});

export default {
  gourmet,
  dish,
  joins,
};
