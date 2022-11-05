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
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setParam((preParam) => {
              return { ...preParam, name: event.target.value };
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setParam((preParam) => ({
              ...preParam,
              personId: event.target.value,
            }));
          }}
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
