import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
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
        <div>{today}</div>
        <h2>記錄你的到訪</h2>
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
            <Link to="/qrReader">
              <Button size="small" color="primary">
                掃瞄二維碼
              </Button>
            </Link>
          </CardActions>
        </StyledCard>
      </Welcome>
      <ContentWrapper>
        <ActionWrapper>
          {hasCameraSupport && (
            <LinkWrapper>
              <StyledLink to="/qrReader">掃瞄二維碼</StyledLink>
              <StyledDivider orientation="vertical" flexItem />
              <StyledLink to="/cameraSetting">相機設定</StyledLink>
            </LinkWrapper>
          )}
          <LinkWrapper>
            <StyledLink to="/qrGenerator">生成二維碼</StyledLink>
          </LinkWrapper>
        </ActionWrapper>
      </ContentWrapper>
    </>
  );
};

const Welcome = styled.div`
  color: #fff;
  padding: 40px 24px 32px 24px;
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
  border-radius: 40px 0 0 0;
`;

const ActionWrapper = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 32px 0;
  flex-shrink: 0;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
`;

const StyledDivider = styled(Divider)`
  margin: 0 8px;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);

  &.MuiDivider-root {
    background-color: #fff;
  }
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  padding: 0 16px;
`;
