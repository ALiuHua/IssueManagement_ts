import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
      <DevTools />
    </FullPage>
  );
};

//用来定义一个error组件，我们可以接受任意类型，但是只有error有message的时候才显示该错误信息。这样可以避免定义所有prop参数必须为Error类型的麻烦
//类型守卫
const isError = (value: any): value is Error => value?.message;
// 当返回值为true时，value即是Error类型

//
export const ErrorBox = ({ error }: { error: unknown }) => {
  //当数据类型是unknow时，我们不可以在上面以任何方式读任何值 if( error.message ) 仍然会报错
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>;
  }
  return null;
};
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
