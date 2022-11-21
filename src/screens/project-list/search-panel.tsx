/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import React from "react";
import { Project } from "./list";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  // setParam: (param: SearchPanelProps["param"]) => void;
  setParam: (
    // callback: (param: SearchPanelProps["param"]) => SearchPanelProps["param"]
    param: SearchPanelProps["param"]
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
            setParam({ ...param, name: event.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}
        />
      </Form.Item>
    </Form>
  );
};
