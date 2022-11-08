import React from "react";
import { useAuth } from "context/auth-context";
// const apiUrl = process.env.REACT_APP_API_URL;
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
export const LoginScreen = () => {
  const { login } = useAuth();
  console.log("this is runingn");
  const submitHandler = (values: { username: string; password: string }) => {
    // console.log(event.currentTarget.elements);
    login(values);
  };
  return (
    <Form onFinish={submitHandler}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="text" id="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};

//onSubmit:点击类型为submit的按钮时会发生的事情

//鸭子类型(duck typing)：面向接口编程 而不是 面向对象
interface Base {
  id: number;
}
interface Advance extends Base {
  name: string;
}

const test = (p: Base) => {};
const a: Advance = { id: 1, name: "jack" };
const b = { id: 2, name: "andy" };
test(a);
test(b);
