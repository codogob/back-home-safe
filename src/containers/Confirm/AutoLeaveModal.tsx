import React, { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import crossBlack from "../../assets/crossBlack.svg";
import greenTick from "../../assets/greenTick.svg";

import styled from "styled-components";
import { ConfirmButton } from "../../components/Button";
import { zeroPadding } from "../../utils/zeroPadding";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: (value: number) => void;
  selectedAutoLeaveHour: number;
  date: Date;
};

export const AutoLeaveModal = ({
  isModalOpen,
  onCancel,
  onConfirm,
  selectedAutoLeaveHour,
  date,
}: Props) => {
  const [autoLeaveHourTmp, setAutoLeaveHourTmp] = useState(
    selectedAutoLeaveHour
  );

  useEffect(() => {
    setAutoLeaveHourTmp(selectedAutoLeaveHour);
  }, [setAutoLeaveHourTmp, selectedAutoLeaveHour]);

  const handleConfirm = () => {
    onConfirm(autoLeaveHourTmp);
  };

  const {
    fromMonth,
    fromDay,
    fromHour,
    fromMinute,
    toMonth,
    toDay,
    toHour,
    toMinute,
  } = useMemo(() => {
    const toDate = new Date(date);
    toDate.setHours(date.getHours() + autoLeaveHourTmp);

    return {
      fromMonth: date.getMonth() + 1,
      fromDay: date.getDate(),
      fromHour: date.getHours(),
      fromMinute: date.getMinutes(),

      toMonth: toDate.getMonth() + 1,
      toDay: toDate.getDate(),
      toHour: toDate.getHours(),
      toMinute: toDate.getMinutes(),
    };
  }, [date, autoLeaveHourTmp]);

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
          height: "370px",
          overflow: "hidden",
        },
      }}
    >
      <ModalCrossWrapper>
        <ModalCross src={crossBlack} onClick={onCancel} />
      </ModalCrossWrapper>
      <ModalTitle>設罝自動離開時間</ModalTitle>
      <HourListWrapper>
        <HourList>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hour) => (
            <HourListItem
              onClick={() => {
                setAutoLeaveHourTmp(hour);
              }}
            >
              + {hour}小時
              {autoLeaveHourTmp === hour && <SelectedTick src={greenTick} />}
            </HourListItem>
          ))}
        </HourList>
      </HourListWrapper>
      <TimeWrapper>
        <div>
          於{zeroPadding(fromMonth)}-{zeroPadding(fromDay)}{" "}
          {zeroPadding(fromHour)}:{zeroPadding(fromMinute)} 進入場所
        </div>
        <div>
          於{zeroPadding(toMonth)}-{zeroPadding(toDay)} {zeroPadding(toHour)}:
          {zeroPadding(toMinute)} 自動離開
        </div>
      </TimeWrapper>
      <ModalConfirmButton onClick={handleConfirm}>確認</ModalConfirmButton>
    </Modal>
  );
};

export default AutoLeaveModal;

const ModalCross = styled.img`
  height: 20px;
`;

const ModalCrossWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ModalTitle = styled.h1`
  font-size: 20px;
  text-align: center;
  text-shadow: none;
  margin-top: 20px;
  margin-bottom: 0;
`;

const ModalConfirmButton = styled(ConfirmButton)`
  font-size: 16px;
  padding: 12px 0;
  width: 90%;
`;

const HourListWrapper = styled.div`
  overflow: auto;
  height: 180px;
  padding: 0 8px;
`;

const HourList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const HourListItem = styled.li`
  text-shadow: none;
  line-height: 40px;
  border-bottom: 1px #eeeeee solid;
  padding: 0 8px;
`;

const TimeWrapper = styled.div`
  font-size: 12px;
  text-shadow: none;
  text-align: center;
  padding: 16px 0;
`;

const SelectedTick = styled.img`
  height: 32px;
  position: relative;
  float: right;
  top: 4px;
`;
