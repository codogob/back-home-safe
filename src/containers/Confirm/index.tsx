import { Dayjs } from "dayjs";
import { propOr } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import cross from "../../assets/cross.svg";
import tick from "../../assets/tick.svg";
import { ConfirmButton } from "../../components/Button";
import { CheckBox } from "../../components/CheckBox";
import { LeaveModal } from "../../components/LeaveModal";
import { Place } from "../../components/Place";
import {
  TravelRecord,
  travelRecordType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";
import { AutoLeaveModal } from "./AutoLeaveModal";

type Props = {
  currentTravelRecord: TravelRecord | null;
  readOnly?: boolean;
  confirmPageIcon?: string | null;
};

export const Confirm = ({
  currentTravelRecord,
  readOnly = false,
  confirmPageIcon,
}: Props) => {
  const { t } = useTranslation("confirm");
  const browserHistory = useHistory();
  const { updateCurrentTravelRecord } = useTravelRecord();
  const [autoLeave, setAutoLeave] = useState(true);
  const [autoLeaveHour, setAutoLeaveHour] = useState(4);
  const [isAutoLeaveModalOpen, setIsAutoLeaveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  useEffect(() => {
    if (!currentTravelRecord) browserHistory.push("/");
  }, [currentTravelRecord, browserHistory]);

  const date = useMemo(() => dayjs(), []);

  const place = useMemo(() => getVenueName(currentTravelRecord), [
    currentTravelRecord,
  ]);

  const handleSetAutoLeaveHour = (value: number) => {
    setAutoLeaveHour(value);
    setIsAutoLeaveModalOpen(false);
  };

  const handleLeavePage = () => {
    setIsAutoLeaveModalOpen(false);
    setIsLeaveModalOpen(false);
    browserHistory.push("/");
  };

  const handleLeave = (date: Dayjs) => {
    updateCurrentTravelRecord({
      outTime: date.startOf("minute").toISOString(),
    });
    handleLeavePage();
  };

  useEffect(() => {
    const toDate = date.add(autoLeaveHour, "hour");
    updateCurrentTravelRecord({
      outTime: autoLeave ? toDate.toISOString() : undefined,
    });
  }, [autoLeave, date, autoLeaveHour, updateCurrentTravelRecord]);

  const venueType = propOr(travelRecordType.PLACE, "type", currentTravelRecord);

  return (
    <>
      <PageWrapper>
        <Header>
          {confirmPageIcon && <Logo src={confirmPageIcon} />}
          {readOnly ? (
            <Cross src={cross} />
          ) : (
            <Link to="/">
              <Cross src={cross} />
            </Link>
          )}
        </Header>
        <MessageWrapper>
          {venueType === travelRecordType.TAXI ? (
            <>
              <Msg>{t("message.you_have_entered_taxi")}</Msg>
              <License>{t("message.res_mark")}:</License>
            </>
          ) : (
            <Msg>{t("message.you_have_entered_venue")}</Msg>
          )}
          <PlaceWrapper>
            <Place value={place || ""} readOnly />
          </PlaceWrapper>
          <Time>{date.format("YYYY-MM-DD HH:mm")}</Time>
        </MessageWrapper>
        <TickWrapper>
          <TickWrapperInner>
            <Tick src={tick} />
          </TickWrapperInner>
        </TickWrapper>
        <ActionGroup>
          <AutoLeave>
            <CheckBoxWrapper>
              <CheckBox
                checked={autoLeave}
                onChange={setAutoLeave}
                readOnly={readOnly}
              />
              {t("form.auto_leave_after_x_hour", { hour: autoLeaveHour })}
            </CheckBoxWrapper>
            <Change
              onClick={() => {
                if (readOnly) return;
                setIsAutoLeaveModalOpen(true);
              }}
            >
              {t("global:button.change")}
            </Change>
          </AutoLeave>
          <ConfirmButton
            shadowed
            onClick={() => {
              if (readOnly) return;
              setIsLeaveModalOpen(true);
            }}
          >
            {t("button.leave")}
          </ConfirmButton>
          <LeaveMessage>{t("message.remember_to_leave")}</LeaveMessage>
        </ActionGroup>
      </PageWrapper>
      <AutoLeaveModal
        isModalOpen={isAutoLeaveModalOpen}
        onCancel={() => {
          setIsAutoLeaveModalOpen(false);
        }}
        onConfirm={handleSetAutoLeaveHour}
        selectedAutoLeaveHour={autoLeaveHour}
        date={date}
      />
      <LeaveModal
        visible={isLeaveModalOpen}
        onDiscard={() => {
          setIsLeaveModalOpen(false);
        }}
        onFinish={handleLeave}
      />
    </>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Logo = styled.img`
  height: 72px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  margin: 24px 0 16px 0;
`;

const Cross = styled.img`
  height: 20px;
  margin: 8px 24px;
  position: absolute;
  right: 0;
`;

const PlaceWrapper = styled.div`
  padding: 0 32px;
`;

const MessageWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TickWrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const TickWrapperInner = styled.div`
  height: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Tick = styled.img`
  display: inline-block;
  height: 100%;
  max-height: 110px;
`;

const Msg = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
`;

const License = styled(Msg)`
  margin-top: 8px;
`;

const Time = styled.div`
  color: #ffffff;
  text-align: center;
`;

const AutoLeave = styled.div`
  margin-bottom: 16px;
  width: 100%;
  max-width: 380px;
  margin: 16px auto;
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
`;

const CheckBoxWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 24px;
  line-height: 32px;
`;

const Change = styled.div`
  flex-shrink: 0;
  padding-right: 24px;
  line-height: 32px;
`;

const LeaveMessage = styled.div`
  text-align: center;
  padding-bottom: 40px;
  flex-shrink: 0;
`;

const ActionGroup = styled.div`
  width: 100%;
  flex-shrink: 0;
`;
