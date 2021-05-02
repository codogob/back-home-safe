import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";
import SettingsIcon from "@material-ui/icons/Settings";
import { Dayjs } from "dayjs";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { LeaveModal } from "../../components/LeaveModal";
import { useTravelRecord } from "../../hooks/useTravelRecord";
import { Home } from "./Home";
import { Settings } from "./Settings";
import { TravelRecord } from "./TravelRecord";

enum tabs {
  HOME = "HOME",
  TRAVEL_RECORD = "TRAVEL_RECORD",
  SETTINGS = "SETTINGS",
}

const tabsArr = ({ t }: { t: TFunction }) => [
  {
    key: tabs.HOME,
    label: t("home.name"),
    component: <Home />,
    icon: <HomeIcon />,
  },
  {
    key: tabs.TRAVEL_RECORD,
    label: t("travel_record.name"),
    component: <TravelRecord />,
    icon: <PlaceIcon />,
  },
  {
    key: tabs.SETTINGS,
    label: t("setting.name"),
    component: <Settings />,
    icon: <SettingsIcon />,
  },
];

const MainScreen = () => {
  const { t } = useTranslation("main_screen");
  const [activePage, setActivePage] = useState(0);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { currentTravelRecord, updateCurrentTravelRecord } = useTravelRecord();
  const tabs = useMemo(() => tabsArr({ t }), [t]);

  const { component } = useMemo(() => tabs[activePage] || {}, [
    activePage,
    tabs,
  ]);

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
          {tabs.map(({ key, label, icon }) => (
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
              {t("global:button.leave")}
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

export default MainScreen;

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
  z-index: 1;
`;
