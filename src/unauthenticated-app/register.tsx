import React from "react";
import { useAuth } from "context/auth-context";
// const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { register } = useAuth();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(event.currentTarget.elements);
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
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
