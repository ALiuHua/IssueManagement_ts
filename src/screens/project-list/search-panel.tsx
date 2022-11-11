/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Form, Input, Select } from "antd";
import React from "react";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  // setParam: (param: SearchPanelProps["param"]) => void;
  setParam: (
    callback: (param: SearchPanelProps["param"]) => SearchPanelProps["param"]
  ) => void;
}
export const SearchPanel: React.FC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
  return (
    <Form
      css={css`
        margin-bottom: 2rem;
      `}
      layout="inline"
    >
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="项目名"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setParam((preParam) => {
              return { ...preParam, name: event.target.value };
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam((preParam) => ({
              ...preParam,
              personId: value,
            }));
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
