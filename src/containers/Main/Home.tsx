import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Place } from "../../components/Place";
import { Link, useHistory } from "react-router-dom";
import { dayjs } from "../../utils/dayjs";
import { isEmpty, isNil, trim } from "ramda";
import {
  useTravelRecord,
  travelRecordType,
  travelRecordInputType,
} from "../../hooks/useTravelRecord";
import { useTime } from "../../hooks/useTime";

export const Home = () => {
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
          <h2>記錄你的到訪</h2>
        </Title>
        <Slider>
          <StyledCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                我想去
              </Typography>
              <StyledPlace
                value={place}
                onChange={setPlace}
                placeholder="輸入地址"
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
                話去就去!
              </Button>
              <Link to="/qrReader">
                <Button
                  size="small"
                  color="primary"
                  disabled={!isNil(currentTravelRecord)}
                >
                  掃瞄二維碼
                </Button>
              </Link>
            </CardActions>
          </StyledCard>
          <StyledCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                我搭緊
              </Typography>
              <StyledPlace
                value={license}
                onChange={setLicense}
                placeholder="輸入車牌"
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
                話搭就搭!
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
