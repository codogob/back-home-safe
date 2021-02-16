import React, { useRef } from "react";
import Modal from "react-modal";
import crossBlack from "../../assets/crossBlack.svg";

import styled from "styled-components";
import { ModalConfirmButton } from "../../components/Button";
import { DatePicker, DatePickerHandler } from "../../components/DatePicker";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const TimePickModal = ({ isModalOpen, onCancel, onConfirm }: Props) => {
  const datePickerRef = useRef<DatePickerHandler>(null);

  const initPicker = () => {
    datePickerRef.current && datePickerRef.current.init();
  };

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
      ariaHideApp={false}
      onAfterOpen={initPicker}
    >
      <CrossWrapper>
        <Cross src={crossBlack} onClick={onCancel} />
      </CrossWrapper>
      <Title>你是什麼時候離開？</Title>
      <TimePickerWrapper>
        <DatePicker ref={datePickerRef} />
      </TimePickerWrapper>
      <ModalConfirmButton onClick={onConfirm}>確認</ModalConfirmButton>
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
  margin-top: 24px;
`;

const TimePickerWrapper = styled.div`
  border-bottom: 1px #eeeeee solid;
  border-top: 1px #eeeeee solid;
  padding: 32px 0;
  margin: 16px 0;
`;
