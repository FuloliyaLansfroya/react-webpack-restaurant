import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Siders = (props) => {
  const { pathname } = useLocation();
  const match = pathname.split('/').filter((x) => x);
  const [open, selected] = match.map((value, index) => `/${match.slice(0, index + 1).join('/')}`);
  const [openKeys = [open]] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };
  const {storeId} = props;
    return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className="logo" />
      <Menu theme="dark"
        mode="inline"
        selectedKeys={[open, selected]}
        defaultOpenKeys={openKeys}
      >
        <Menu.Item key="/restaurant/gourmet" icon={<PieChartOutlined />}>
          <NavLink to={{pathname:"/restaurant/gourmet",state:{storeId:storeId}}}> 美食</NavLink>
        </Menu.Item>
        <Menu.Item key="/restaurant/drinkAdesert" icon={<DesktopOutlined />}>
          <NavLink to={{pathname:"/restaurant/drinkAdesert",state:{storeId:storeId}}}> 饮品和甜品</NavLink>
        </Menu.Item>
        <SubMenu key="/restaurant/scale" icon={<UserOutlined />} title="餐桌规模">
          <Menu.Item key="/restaurant/scale/2&scale">
            <NavLink to={{pathname:"/restaurant/scale/2&scale",state:{storeId:storeId}}}>双人</NavLink>
          </Menu.Item>
          <Menu.Item key="/restaurant/scale/4&scale">
            <NavLink to={{pathname:"/restaurant/scale/4&scale",state:{storeId:storeId}}}> 四人</NavLink>
          </Menu.Item>
          <Menu.Item key="/restaurant/scale/8&scale">
            <NavLink to={{pathname:"/restaurant/scale/8&scale",state:{storeId:storeId}}}> 包间（8-12人）</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="/restaurant/staff" icon={<TeamOutlined />} title="餐厅工作人员资料">
          <Menu.Item key="/restaurant/staff/witer">
            <NavLink to={{pathname:"/restaurant/staff/witer",state:{storeId:storeId}}}>服务员</NavLink>{" "}
          </Menu.Item>
          <Menu.Item key="/restaurant/staff/chef">
            <NavLink to={{pathname:"/restaurant/staff/chef",state:{storeId:storeId}}}>厨师</NavLink>
          </Menu.Item>
          <Menu.Item key="/restaurant/staff/master">
            <NavLink to={{pathname:"/restaurant/staff/master",state:{storeId:storeId}}}>店长</NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/restaurant/join" icon={<FileOutlined />}>
          <NavLink to={{pathname:"/restaurant/join",state:{storeId:storeId}}}>店铺介绍</NavLink>
        </Menu.Item>
        <Menu.Item key="/restaurant/shopping" icon={<FileOutlined />}>
          <NavLink to={{pathname:"/restaurant/shopping",state:{storeId:storeId}}}>购物车</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin" icon={<FileOutlined />}>
          <a href="/admin">管理页面</a>
        </Menu.Item>
        <Menu.Item key="/" icon={<FileOutlined />}>
          <a href="/">返回首页</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Siders;
