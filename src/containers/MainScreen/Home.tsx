import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { isEmpty, isNil, trim } from "ramda";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Place } from "../../components/Place";
import { useTime } from "../../hooks/useTime";
import {
  travelRecordInputType,
  travelRecordType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";

export const Home = () => {
  const { t } = useTranslation("main_screen");
  const [place, setPlace] = useState("");
  const [license, setLicense] = useState("");

  const browserHistory = useHistory();
  const { createTravelRecord, currentTravelRecord } = useTravelRecord();
  const { currentTime } = useTime();

  const today = useMemo(() => {
    return currentTime.format("YYYY-MM-DD, dddd");
  }, [currentTime]);

  const handlePlaceSubmit = () => {
    createTravelRecord({
      nameZh: place,
      type: travelRecordType.PLACE,
      inputType: travelRecordInputType.MANUALLY,
      inTime: dayjs().toISOString(),
    });

    browserHistory.push({ pathname: "/confirm" });
  };

  const handleTaxiSubmit = () => {
    createTravelRecord({
      venueId: license,
      type: travelRecordType.TAXI,
      inputType: travelRecordInputType.MANUALLY,
      inTime: dayjs().toISOString(),
    });

    browserHistory.push({ pathname: "/confirm" });
  };

  return (
    <>
      <Welcome>
        <Title>
          <div>{today}</div>
          <h2>{t("home.record_your_visit")}</h2>
        </Title>
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
                readOnly={!isNil(currentTravelRecord)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={isEmpty(trim(place)) || !isNil(currentTravelRecord)}
                onClick={handlePlaceSubmit}
              >
                {t("home.button.go")}
              </Button>
              {isNil(currentTravelRecord) ? (
                <Link to="/qrReader">
                  <Button size="small" color="primary">
                    {t("home.button.scan_qr_code")}
                  </Button>
                </Link>
              ) : (
                <Button size="small" color="primary" disabled>
                  {t("home.button.scan_qr_code")}
                </Button>
              )}
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
                readOnly={!isNil(currentTravelRecord)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={isEmpty(trim(license)) || !isNil(currentTravelRecord)}
                onClick={handleTaxiSubmit}
              >
                {t("home.button.ride")}
              </Button>
            </CardActions>
          </StyledCard>
        </Slider>
      </Welcome>
      <ContentWrapper />
    </>
  );
};

const Welcome = styled.div`
  color: #fff;
  padding: 40px 24px 32px 24px;
`;

const Title = styled.div`
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`;

const StyledCard = styled(Card)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  min-width: 80vw;
`;

const Slider = styled.div`
  position: absolute;
  display: flex;
  overflow: auto;
  width: 100%;
  left: 0;
  padding: 16px 0;

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

const ContentWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;
