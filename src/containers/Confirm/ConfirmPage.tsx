import { isNil, propOr } from "ramda";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import cross from "../../assets/cross.svg";
import tick from "../../assets/tick.svg";
import { ConfirmButton } from "../../components/Button";
import { CheckBox } from "../../components/CheckBox";
import { Place } from "../../components/Place";
import { locationType } from "../../hooks/useBookmark";
import { useI18n } from "../../hooks/useI18n";
import { TravelRecord } from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";

type Props = {
  travelRecord: TravelRecord;
  readOnly?: boolean;
  confirmPageIcon?: string | null;
  autoLeave?: boolean;
  autoLeaveHour?: number;
  setAutoLeave?: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeAutoLeaveHour?: () => void;
  handleLeave?: () => void;
};

export const ConfirmPage = ({
  travelRecord,
  readOnly = false,
  confirmPageIcon,
  autoLeave = true,
  setAutoLeave,
  autoLeaveHour = 4,
  handleChangeAutoLeaveHour,
  handleLeave,
}: Props) => {
  const { t } = useTranslation("confirm");
  const { language } = useI18n();

  const date = useMemo(() => dayjs(travelRecord.inTime), [travelRecord]);

  const place = useMemo(
    () => getVenueName(travelRecord, language),
    [travelRecord, language]
  );

  const venueType = propOr(locationType.PLACE, "type", travelRecord);

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
          {venueType === locationType.TAXI ? (
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
          <ConfirmButton shadowed onClick={handleLeave}>
            {venueType === locationType.TAXI
              ? t("button.get_off")
              : t("button.leave")}
          </ConfirmButton>
          <LeaveMessage>{t("message.remember_to_leave")}</LeaveMessage>
          <AutoLeave>
            <CheckBoxWrapper>
              <CheckBox
                checked={autoLeave}
                onChange={setAutoLeave}
                readOnly={isNil(setAutoLeave)}
              />
              {t("form.auto_leave_after_x_hour", { hour: autoLeaveHour })}
            </CheckBoxWrapper>
            <Change onClick={handleChangeAutoLeaveHour}>
              {t("global:button.change")}
            </Change>
          </AutoLeave>
        </ActionGroup>
      </PageWrapper>
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
  width: 100%;
  max-width: 380px;
  margin: 16px auto 24px auto;
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
  color: #fed426;
  text-decoration: underline;
`;

const LeaveMessage = styled.div`
  text-align: center;
  flex-shrink: 0;
`;

const ActionGroup = styled.div`
  width: 100%;
  flex-shrink: 0;
`;
