import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import StoreIcon from "@material-ui/icons/Store";
import { Dayjs } from "dayjs";
import { isEmpty, trim } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { LeaveModal } from "../../components/LeaveModal";
import { Place } from "../../components/Place";
import { locationType, useBookmarkLocation } from "../../hooks/useBookmark";
import { useI18n } from "../../hooks/useI18n";
import { useTime } from "../../hooks/useTime";
import {
  travelRecordInputType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";

export const Home = () => {
  const { t } = useTranslation("main_screen");
  const [place, setPlace] = useState("");
  const [license, setLicense] = useState("");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveId, setLeaveId] = useState<null | string>(null);
  const { currentTravelRecord, updateTravelRecord } = useTravelRecord();
  const { enterLocation } = useTravelRecord();
  const { currentTime } = useTime();
  const { language } = useI18n();
  const {
    createBookmarkLocation,
    getBookmarkLocationId,
    removeBookmarkLocation,
  } = useBookmarkLocation();

  const today = useMemo(() => {
    return currentTime.format("YYYY-MM-DD, dddd");
  }, [currentTime]);

  const handlePlaceSubmit = () => {
    enterLocation({
      nameZh: place,
      type: locationType.PLACE,
      inputType: travelRecordInputType.MANUALLY,
    });
  };

  const handleTaxiSubmit = () => {
    enterLocation({
      venueId: license,
      type: locationType.TAXI,
      inputType: travelRecordInputType.MANUALLY,
    });
  };

  const handleLeave = (date: Dayjs) => {
    if (!leaveId) return;
    updateTravelRecord(leaveId, {
      outTime: date.startOf("minute").toISOString(),
    });
    setLeaveModalOpen(false);
  };

  useEffect(() => {
    if (leaveId) setLeaveModalOpen(true);
  }, [leaveId]);

  useEffect(() => {
    if (!leaveModalOpen) setLeaveId(null);
  }, [leaveModalOpen]);

  return (
    <PageWrapper>
      {leaveId && (
        <LeaveModal
          id={leaveId}
          visible={leaveModalOpen}
          onDiscard={() => {
            setLeaveModalOpen(false);
          }}
          onFinish={handleLeave}
        />
      )}
      <Welcome>
        <Title>
          <div>{today}</div>
          <h2>{t("home.record_your_visit")}</h2>
        </Title>
      </Welcome>
      <SliderWrapper>
        <Slider>
          <StyledCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("home.form.venue_name.label")}
              </Typography>
              <StyledPlace
                value={place}
                onChange={setPlace}
                placeholder={t("home.form.venue_name.placeholder")}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={isEmpty(trim(place))}
                onClick={handlePlaceSubmit}
              >
                {t("home.button.go")}
              </Button>
              <Link to="/qrReader">
                <Button size="small" color="primary">
                  {t("home.button.scan_qr_code")}
                </Button>
              </Link>
            </CardActions>
          </StyledCard>
          <StyledCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("home.form.taxi.label")}
              </Typography>
              <StyledPlace
                value={license}
                onChange={setLicense}
                placeholder={t("home.form.taxi.placeholder")}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={isEmpty(trim(license))}
                onClick={handleTaxiSubmit}
              >
                {t("home.button.ride")}
              </Button>
            </CardActions>
          </StyledCard>
        </Slider>
      </SliderWrapper>
      <TravelRecordWrapper>
        <TravelRecordInner>
          <h3>{t("home.you_have_entered")}</h3>
          {isEmpty(currentTravelRecord) && (
            <Msg>{t("travel_record.message.empty")}</Msg>
          )}
          {currentTravelRecord.map((item) => {
            const bookmarkId = getBookmarkLocationId(item);
            return (
              <Item key={item.id}>
                <CardHeader
                  avatar={
                    item.type === locationType.TAXI ? (
                      <LocalTaxiIcon />
                    ) : (
                      <StoreIcon />
                    )
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        bookmarkId
                          ? removeBookmarkLocation(bookmarkId)
                          : createBookmarkLocation(item);
                      }}
                    >
                      {bookmarkId ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  }
                  title={getVenueName(item, language)}
                  subheader={`${dayjs(item.inTime).format(
                    "YYYY-MM-DD HH:mm"
                  )} - ${
                    item.outTime
                      ? dayjs(item.outTime).format("YYYY-MM-DD HH:mm")
                      : ""
                  }`}
                />
                <CardActions disableSpacing>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      setLeaveId(item.id);
                    }}
                  >
                    {t("global:button.leave")}
                  </Button>
                  <Link to={`/confirm/${item.id}`}>
                    <Button size="small" color="primary">
                      {t("global:button.confirm_page")}
                    </Button>
                  </Link>
                </CardActions>
              </Item>
            );
          })}
        </TravelRecordInner>
      </TravelRecordWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.div`
  color: #fff;
  padding: 40px 24px 32px 24px;
  flex-shrink: 0;
`;

const Title = styled.div`
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`;

const StyledCard = styled(Card)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  min-width: 80vw;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
  width: 100%;
  left: 0;
  top: -24px;
  padding: 8px 0;

  &::before {
    content: "";
    flex: 0 0 24px;
  }

  &::after {
    content: "";
    flex: 0 0 24px;
  }

  & ${StyledCard}:not(:last-child) {
    margin-right: 16px;
  }
`;

const StyledPlace = styled(Place)`
  text-align: left;
`;

const SliderWrapper = styled.div`
  background-color: #fff;
  border-radius: 32px 32px 0 0;
  flex-shrink: 0;
`;

const TravelRecordWrapper = styled.div`
  background-color: #fff;

  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TravelRecordInner = styled.div`
  padding: 0 16px;
`;

const Item = styled(Card)`
  margin-bottom: 16px;
`;

const Msg = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
  line-height: 48px;
`;
