import { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import styled from "styled-components";

import crossBlack from "../../assets/crossBlack.svg";
import greenTick from "../../assets/greenTick.svg";
import { ModalConfirmButton } from "../../components/Button";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: (value: number) => void;
  selectedAutoLeaveHour: number;
  date: Dayjs;
};

export const AutoLeaveModal = ({
  isModalOpen,
  onCancel,
  onConfirm,
  selectedAutoLeaveHour,
  date,
}: Props) => {
  const { t } = useTranslation("confirm");
  const [autoLeaveHourTmp, setAutoLeaveHourTmp] = useState(
    selectedAutoLeaveHour
  );

  useEffect(() => {
    setAutoLeaveHourTmp(selectedAutoLeaveHour);
  }, [setAutoLeaveHourTmp, selectedAutoLeaveHour]);

  const handleConfirm = () => {
    onConfirm(autoLeaveHourTmp);
  };

  const toDate = useMemo(() => date.add(autoLeaveHourTmp, "hour"), [
    date,
    autoLeaveHourTmp,
  ]);

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
      ariaHideApp={false}
    >
      <CrossWrapper>
        <Cross src={crossBlack} onClick={onCancel} />
      </CrossWrapper>
      <Title>{t("message.set_auto_leave_time")}</Title>
      <HourListWrapper id="scroll">
        <HourList>
          {[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
          ].map((hour) => (
            <HourListItem
              onClick={() => {
                setAutoLeaveHourTmp(hour);
              }}
              key={hour}
            >
              + {hour}
              {t("form.hour")}
              {autoLeaveHourTmp === hour && <SelectedTick src={greenTick} />}
            </HourListItem>
          ))}
        </HourList>
      </HourListWrapper>
      <TimeWrapper>
        <div>{t("message.enter_at", { time: date.format("MM-DD HH:mm") })}</div>
        <div>
          {t("message.auto_leave_at", { time: toDate.format("MM-DD HH:mm") })}
        </div>
      </TimeWrapper>
      <ModalConfirmButton onClick={handleConfirm}>
        {t("global:button.confirm")}
      </ModalConfirmButton>
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

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
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
  line-height: 40px;
  border-bottom: 1px #eeeeee solid;
  padding: 0 8px;
`;

const TimeWrapper = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 16px 0;
`;

const SelectedTick = styled.img`
  height: 32px;
  position: relative;
  float: right;
  top: 4px;
`;
