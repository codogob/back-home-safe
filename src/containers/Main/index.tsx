import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { isEmpty, trim } from "ramda";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ConfirmButton, ModalConfirmButton } from "../../components/Button";
import { Place } from "../../components/Place";
import { useCamera } from "../../hooks/useCamera";
import { dayjs } from "../../utils/dayjs";
import HomeIcon from "@material-ui/icons/Home";

const Main = () => {
  const { hasCameraSupport } = useCamera();
  const [place, setPlace] = useState("");

  const today = useMemo(() => {
    return dayjs().format("YYYY-MM-DD, dddd");
  }, []);

  return (
    <PageWrapper>
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
          {isEmpty(trim(place)) ? (
            <ConfirmButton disabled shadowed>
              話去就去!
            </ConfirmButton>
          ) : (
            <Link to={{ pathname: "/confirm", search: `?place=${place}` }}>
              <ConfirmButton shadowed>話去就去!</ConfirmButton>
            </Link>
          )}
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
      <BottomNavigation showLabels>
        <BottomNavigationAction label="主頁" icon={<HomeIcon />} />
      </BottomNavigation>
    </PageWrapper>
  );
};

export default Main;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
`;

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
