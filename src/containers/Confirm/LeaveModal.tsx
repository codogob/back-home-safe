import React from "react";
import Modal from "react-modal";
import crossBlack from "../../assets/crossBlack.svg";

import styled from "styled-components";
import { ModalConfirmButton } from "../../components/Button";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const LeaveModal = ({ isModalOpen, onCancel, onConfirm }: Props) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCancel}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          outline: "none",
          border: "0",
          padding: "16px",
          borderRadius: "8px",
          width: "240px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "280px",
          overflow: "hidden",
        },
      }}
    >
      <CrossWrapper>
        <Cross src={crossBlack} onClick={onCancel} />
      </CrossWrapper>
      <Title>你現在要離開嗎？</Title>
      <ModalConfirmButton onClick={onConfirm}>
        是的，我現在要離開
      </ModalConfirmButton>
      <GreenButton onClick={onConfirm}>我現已經離開了</GreenButton>
    </Modal>
  );
};

const Cross = styled.img`
  height: 20px;
`;

const CrossWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 56px 0;
`;

const GreenButton = styled(ModalConfirmButton)`
  background-color: #12b188;
  color: #fff;
`;
