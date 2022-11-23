import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;
// React的utilty type来获取组件或者元素的props类型 https://segmentfault.com/a/1190000020536678
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "option"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}> {defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

//实现数据透传（因为本身Select有更多props可选值，我门这里使用了Select组件但是只给组件定义了四个自己的类型；
//我们想要能够在IdSelect中传入更多的Select组件带有的props值;拓展已有组件时经常会用到）
//1. 获取组建身上自带的props  React.ComponentProps(typeof componentName)
//2. 结构出组件身上自带的props其他所有的用restProps来接收
