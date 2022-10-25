export const SearchPanel = ({ param, setParam, users }) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam((preParam) => {
              return { ...preParam, name: event.target.value };
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event) => {
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
