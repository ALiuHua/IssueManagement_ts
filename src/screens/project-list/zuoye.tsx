import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 23 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {});
  return (
    <div>
      <button
        onClick={() => {
          add({ name: "john", age: 22 });
        }}
      >
        add john
      </button>
      <button
        onClick={() => {
          removeIndex(0);
        }}
      >
        remove
      </button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person: { name: string; age: number }, index: number) => (
        <div key={person.name + index}>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
