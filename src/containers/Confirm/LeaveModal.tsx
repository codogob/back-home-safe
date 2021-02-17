import React, { useMemo } from "react";
import Modal from "react-modal";
import crossBlack from "../../assets/crossBlack.svg";

import styled from "styled-components";
import { ModalConfirmButton } from "../../components/Button";
import { zeroPadding } from "../../utils/zeroPadding";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onLeaveNow: () => void;
  onLeaved: () => void;
  place: string;
  date: Date;
  autoLeaveHour: number;
};

export const LeaveModal = ({
  isModalOpen,
  onCancel,
  onLeaveNow,
  onLeaved,
  place,
  date,
  autoLeaveHour,
}: Props) => {
  const shouldDisplayAutoLeave = autoLeaveHour !== 0;

  const {
    fromYear,
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
    toDate.setHours(date.getHours() + autoLeaveHour);

    return {
      fromYear: date.getFullYear(),
      fromMonth: date.getMonth() + 1,
      fromDay: date.getDate(),
      fromHour: date.getHours(),
      fromMinute: date.getMinutes(),

      toMonth: toDate.getMonth() + 1,
      toDay: toDate.getDate(),
      toHour: toDate.getHours(),
      toMinute: toDate.getMinutes(),
    };
  }, [date, autoLeaveHour]);

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
          height: shouldDisplayAutoLeave ? "430px" : "390px",
          overflow: "hidden",
        },
      }}
      ariaHideApp={false}
    >
      <CrossWrapper>
        <Cross src={crossBlack} onClick={onCancel} />
      </CrossWrapper>
      <Msg>你已進入場所</Msg>
      <Place>{place}</Place>
      <Time>{`${fromYear}-${zeroPadding(fromMonth)}-${zeroPadding(
        fromDay
      )} ${zeroPadding(fromHour)}:${zeroPadding(fromMinute)}`}</Time>
      <Title>你現在要離開嗎？</Title>
      {shouldDisplayAutoLeave && (
        <AutoLeave>
          於{zeroPadding(toMonth)}-{zeroPadding(toDay)} {zeroPadding(toHour)}:
          {zeroPadding(toMinute)} 自動離開
        </AutoLeave>
      )}
      <ModalConfirmButton onClick={onLeaveNow}>
        是的，我現在要離開
      </ModalConfirmButton>
      <GreenButton onClick={onLeaved}>我現已經離開了</GreenButton>
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
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 64px 0;
  font-weight: bold;
`;

const GreenButton = styled(ModalConfirmButton)`
  background-color: #12b188;
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`;

const Msg = styled.div`
  text-align: center;
  font-size: 16px;
`;

const Time = styled.div`
  text-align: center;
  font-size: 14px;
`;

const Place = styled.div`
  color: unset;
  text-shadow: none;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  line-height: 48px;
`;

const AutoLeave = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 12px 0;
`;
