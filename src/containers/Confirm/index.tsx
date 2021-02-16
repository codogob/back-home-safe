import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import cross from "../../assets/cross.svg";

import tick from "../../assets/tick.svg";
import checkbox from "../../assets/checkbox.svg";
import checkboxChecked from "../../assets/checkboxChecked.svg";

import { Link, useHistory, useLocation } from "react-router-dom";
import { ConfirmButton } from "../../components/Button";
import { zeroPadding } from "../../utils/zeroPadding";
import { Place } from "../../components/Place";
import { AutoLeaveModal } from "./AutoLeaveModal";
import { LeaveModal } from "./LeaveModal";
import { TimePickModal } from "./TimePickModal";

export const Confirm = () => {
  const browserHistory = useHistory();
  const browserLocation = useLocation();
  const [autoLeave, setAutoLeave] = useState(false);
  const [autoLeaveHour, setAutoLeaveHour] = useState(4);
  const [isAutoLeaveModalOpen, setIsAutoLeaveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isTimePickModalOpen, setIsTimePickModalOpen] = useState(false);

  const place = useMemo(
    () => new URLSearchParams(browserLocation.search).get("place"),
    [browserLocation.search]
  );

  useEffect(() => {
    if (!place || place === "") browserHistory.push("/");
  }, [browserHistory, place]);

  const { date, year, month, day, hour, minute } = useMemo(() => {
    const date = new Date();
    return {
      date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }, []);

  const handleCheckBoxClick = () => {
    setAutoLeave((prev) => !prev);
  };

  const handleSetAutoLeaveHour = (value: number) => {
    setAutoLeaveHour(value);
    setIsAutoLeaveModalOpen(false);
  };

  const handleLeavePage = () => {
    browserHistory.push("/");
  };

  const handleLeaved = () => {
    setIsLeaveModalOpen(false);
    setIsTimePickModalOpen(true);
  };

  return (
    <PageWrapper>
      <Header>
        <Link to="/">
          <Cross src={cross} />
        </Link>
      </Header>
      <Msg>你已進入場所</Msg>
      {place && <Place value={place} readOnly />}
      <Time>{`${year}-${zeroPadding(month)}-${zeroPadding(day)} ${zeroPadding(
        hour
      )}:${zeroPadding(minute)}`}</Time>
      <TickWrapper>
        <Tick src={tick} />
      </TickWrapper>
      <AutoLeave>
        <CheckBoxWrapper>
          <CheckBox
            src={autoLeave ? checkboxChecked : checkbox}
            onClick={handleCheckBoxClick}
          />
          {autoLeaveHour}小時後自動離開
        </CheckBoxWrapper>
        <Change
          onClick={() => {
            setIsAutoLeaveModalOpen(true);
          }}
        >
          變更
        </Change>
      </AutoLeave>
      <ConfirmButton
        shadowed
        onClick={() => {
          setIsLeaveModalOpen(true);
        }}
      >
        離開
      </ConfirmButton>
      <LeaveMessage>當你離開時請緊記按"離開"</LeaveMessage>
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
        isModalOpen={isLeaveModalOpen}
        onCancel={() => {
          setIsLeaveModalOpen(false);
        }}
        onLeaveNow={handleLeavePage}
        onLeaved={handleLeaved}
      />
      <TimePickModal
        isModalOpen={isTimePickModalOpen}
        onCancel={() => {
          setIsTimePickModalOpen(false);
        }}
        onConfirm={handleLeavePage}
      />
    </PageWrapper>
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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const Cross = styled.img`
  height: 20px;
  margin: 24px;
`;

const TickWrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Tick = styled.img`
  display: inline-block;
  margin-top: 80px;
  width: 32%;
`;

const Msg = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  margin-top: 50px;
`;

const Time = styled.div`
  color: #ffffff;
  text-align: center;
`;

const AutoLeave = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
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

const CheckBox = styled.img`
  height: 32px;
  display: inline-block;
  vertical-align: top;
  margin-right: 8px;
`;

const LeaveMessage = styled.div`
  text-align: center;
  padding-bottom: 40px;
`;
