import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import cross from "../../assets/cross.svg";
import tick from "../../assets/tick.svg";
import checkbox from "../../assets/checkbox.svg";
import checkboxChecked from "../../assets/checkboxChecked.svg";

import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { zeroPadding } from "../../utils/zeroPadding";
import { Place } from "../../components/Place";

type Props = {
  place: string;
};

export const Confirm = ({ place }: Props) => {
  const browserHistory = useHistory();
  const [autoLeave, setAutoLeave] = useState(false);

  useEffect(() => {
    if (place === "") browserHistory.push("/");
  }, [place, browserHistory]);

  const { year, month, day, hour, minute } = useMemo(() => {
    const date = new Date();
    return {
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

  return (
    <>
      <Link to="/">
        <Cross src={cross} />
      </Link>
      <ContentWrapper>
        <Msg>你已進入場所</Msg>
        <Place value={place} readOnly />
        <Time>{`${year}-${zeroPadding(month)}-${zeroPadding(day)} ${zeroPadding(
          hour
        )}:${zeroPadding(minute)}`}</Time>
        <Tick src={tick} />
      </ContentWrapper>
      <ActionWrapper>
        <AutoLeave>
          <CheckBoxWrapper>
            <CheckBox
              src={autoLeave ? checkboxChecked : checkbox}
              onClick={handleCheckBoxClick}
            />
            4小時後自動離開
          </CheckBoxWrapper>
          <Change>變更</Change>
        </AutoLeave>
        <Link to="/">
          <Button>離開</Button>
        </Link>
        <div>當你離開時請緊記按"離開"</div>
      </ActionWrapper>
    </>
  );
};

const Cross = styled.img`
  height: 20px;
  float: right;
  position: absolute;
  top: 24px;
  right: 24px;
`;

const Tick = styled.img`
  margin: auto;
  margin-top: 80px;
  width: 32%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Msg = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  margin-top: 120px;
`;

const Time = styled.div`
  color: #ffffff;
  text-align: center;
`;

const ActionWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #fff;
  padding-bottom: 40px;
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
