import dayjs, { Dayjs } from "dayjs";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import styled from "styled-components";

import crossBlack from "../../assets/crossBlack.svg";
import { travelRecordType } from "../../hooks/useTravelRecord";
import { ModalConfirmButton } from "../Button";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onLeaveNow: () => void;
  onLeaved: () => void;
  place: string;
  date: Dayjs;
  outTime?: string;
  venueType: travelRecordType;
};

export const Prompt = ({
  isModalOpen,
  onCancel,
  onLeaveNow,
  onLeaved,
  place,
  date,
  outTime,
  venueType,
}: Props) => {
  const { t } = useTranslation("confirm");
  const toDate = useMemo(() => dayjs(outTime), [outTime]);

  const heightBase = outTime ? 430 : 390;

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
          height:
            venueType === travelRecordType.TAXI
              ? `${heightBase + 24}px`
              : `${heightBase}px`,
          overflow: "hidden",
        },
      }}
      ariaHideApp={false}
    >
      <CrossWrapper>
        <Cross src={crossBlack} onClick={onCancel} />
      </CrossWrapper>
      {venueType === travelRecordType.TAXI ? (
        <>
          <Msg>{t("message.you_have_entered_taxi")}</Msg>
          <License>{t("message.res_mark")}:</License>
        </>
      ) : (
        <Msg>{t("message.you_have_entered_venue")}</Msg>
      )}
      <Place>{place}</Place>
      <Time>{date.format("YYYY-MM-DD HH:mm")}</Time>
      <Title>{t("message.you_sure_want_to_leave")}</Title>
      {outTime && (
        <AutoLeave>
          {t("form.auto_leave_at", { time: toDate.format("MM-DD HH:mm") })}
        </AutoLeave>
      )}
      <ModalConfirmButton onClick={onLeaveNow}>
        {t("button.leave_now")}
      </ModalConfirmButton>
      <GreenButton onClick={onLeaved}> {t("button.already_left")}</GreenButton>
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
  font-weight: 500;
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

const License = styled(Msg)`
  margin-top: 8px;
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
  font-weight: 500;
  line-height: 48px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const AutoLeave = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 12px 0;
`;
