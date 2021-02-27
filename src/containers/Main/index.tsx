import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import { Home } from "./Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { Settings } from "./Settings";
import { useTravelRecord } from "../../hooks/useTravelRecord";
import { Fab } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { LeaveModal } from "../../components/LeaveModal";
import { Dayjs } from "dayjs";
import { TravelRecord } from "./TravelRecord";
import PlaceIcon from "@material-ui/icons/Place";

enum tabs {
  HOME = "HOME",
  TRAVEL_RECORD = "TRAVEL_RECORD",
  SETTINGS = "SETTINGS",
}

const tabsArr = [
  {
    key: tabs.HOME,
    label: "主頁",
    component: <Home />,
    icon: <HomeIcon />,
  },
  {
    key: tabs.TRAVEL_RECORD,
    label: "出行紀錄",
    component: <TravelRecord />,
    icon: <PlaceIcon />,
  },
  {
    key: tabs.SETTINGS,
    label: "設定",
    component: <Settings />,
    icon: <SettingsIcon />,
  },
];

const Main = () => {
  const [activePage, setActivePage] = useState(0);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { currentTravelRecord, updateCurrentTravelRecord } = useTravelRecord();
  const { component } = useMemo(() => tabsArr[activePage] || {}, [activePage]);

  const handleLeave = (date: Dayjs) => {
    updateCurrentTravelRecord({
      outTime: date.startOf("minute").toISOString(),
    });
    setIsLeaveModalOpen(false);
  };

  return (
    <PageWrapper>
      {component}
      <NavWrapper>
        <BottomNavigation
          showLabels
          value={activePage}
          onChange={(event, newValue) => {
            setActivePage(newValue);
          }}
        >
          {tabsArr.map(({ key, label, icon }) => (
            <BottomNavigationAction key={key} label={label} icon={icon} />
          ))}
        </BottomNavigation>
      </NavWrapper>
      {currentTravelRecord && (
        <>
          <FloatingButton>
            <Fab
              variant="extended"
              color="secondary"
              onClick={() => {
                setIsLeaveModalOpen(true);
              }}
            >
              <ExitToAppIcon />
              離開
            </Fab>
          </FloatingButton>
          <LeaveModal
            visible={isLeaveModalOpen}
            onDiscard={() => {
              setIsLeaveModalOpen(false);
            }}
            onFinish={handleLeave}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Main;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FloatingButton = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 80px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;

  & button {
    pointer-events: all;
  }
`;

const NavWrapper = styled.div`
  flex-shrink: 0;
  box-shadow: 0 0 3.6px 0 rgb(0 0 0 / 13%), 0 0 0.9px 0 rgb(0 0 0 / 11%);
  padding-bottom: 8px;
  background-color: #fff;
`;
