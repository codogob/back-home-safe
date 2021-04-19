import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Dayjs } from "dayjs";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import styled from "styled-components";

import crossBlack from "../../assets/crossBlack.svg";
import { ModalConfirmButton } from "../../components/Button";
import { DatePicker, DatePickerHandler } from "../../components/DatePicker";
import { useTime } from "../../hooks/useTime";
import { dayjs } from "../../utils/dayjs";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: (date: Dayjs) => void;
  date: Dayjs;
};

export const TimePickModal = ({
  isModalOpen,
  onCancel,
  onConfirm,
  date,
}: Props) => {
  const { t } = useTranslation("confirm");
  const { currentTime } = useTime();
  const datePickerRef = useRef<DatePickerHandler>(null);
  const [showPastDateError, setShowPastDateError] = useState(false);
  const [showFutureDateError, setShowFutureDateError] = useState(false);

  const initPicker = () => {
    datePickerRef.current && datePickerRef.current.init();
  };

  const handleConfirm = () => {
    const leaveDate = datePickerRef.current
      ? datePickerRef.current.getValue()
      : Date();

    const leaveDateDayJs = dayjs(leaveDate).startOf("minute");

    if (leaveDateDayJs.isBefore(date.startOf("minute"))) {
      setShowPastDateError(true);
    } else if (leaveDateDayJs.isAfter(currentTime)) {
      setShowFutureDateError(true);
    } else {
      onConfirm(leaveDateDayJs);
    }
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
      <Title>{t("message.when_you_left")}</Title>
      <TimePickerWrapper>
        <DatePicker ref={datePickerRef} />
      </TimePickerWrapper>
      <ModalConfirmButton onClick={handleConfirm}>
        {t("global:button.confirm")}
      </ModalConfirmButton>
      <Snackbar
        open={showPastDateError}
        autoHideDuration={2000}
        onClose={() => {
          setShowPastDateError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {t("message.leave_time_earlier_than_enter")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showFutureDateError}
        autoHideDuration={2000}
        onClose={() => {
          setShowFutureDateError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {t("message.future_leave_time")}
        </Alert>
      </Snackbar>
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
