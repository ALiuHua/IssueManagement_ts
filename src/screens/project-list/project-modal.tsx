import { Button, Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  console.log(projectModalOpen);
  return (
    <Drawer width="100%" onClose={close} open={projectModalOpen}>
      <h1>Project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
