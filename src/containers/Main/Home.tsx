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
import { Link } from "react-router-dom";
import { useCamera } from "../../hooks/useCamera";
import { dayjs } from "../../utils/dayjs";
import { isEmpty, trim } from "ramda";

export const Home = () => {
  const { hasCameraSupport } = useCamera();
  const [place, setPlace] = useState("");

  const today = useMemo(() => {
    return dayjs().format("YYYY-MM-DD, dddd");
  }, []);

  return (
    <>
      <Welcome>
        <Title>
          <div>{today}</div>
          <h2>記錄你的到訪</h2>
        </Title>
        <StyledCard>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              我想去
            </Typography>
            <StyledPlace
              value={place}
              onChange={setPlace}
              placeholder="輸入地址"
            />
          </CardContent>
          <CardActions>
            {isEmpty(trim(place)) ? (
              <Button size="small" color="primary" disabled>
                話去就去!
              </Button>
            ) : (
              <Link to={{ pathname: "/confirm", search: `?place=${place}` }}>
                <Button size="small" color="primary">
                  話去就去!
                </Button>
              </Link>
            )}
            {hasCameraSupport && (
              <Link to="/qrReader">
                <Button size="small" color="primary">
                  掃瞄二維碼
                </Button>
              </Link>
            )}
          </CardActions>
        </StyledCard>
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
  position: absolute;
  left: 24px;
  right: 24px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`;

const StyledPlace = styled(Place)`
  text-align: left;
`;

const ContentWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  overflow: auto;
  border-radius: 40px 40px 0 0;
`;
