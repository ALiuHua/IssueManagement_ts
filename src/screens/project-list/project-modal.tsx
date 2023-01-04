import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width="100%" onClose={close} visible={projectModalOpen}>
      <h1>Project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
