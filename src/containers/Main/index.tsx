import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import { Home } from "./Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { Settings } from "./Settings";

enum tabs {
  HOME = "HOME",
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
    key: tabs.SETTINGS,
    label: "設定",
    component: <Settings />,
    icon: <SettingsIcon />,
  },
];

const Main = () => {
  const [activePage, setActivePage] = useState(0);
  const { component } = useMemo(() => tabsArr[activePage] || {}, [activePage]);

  return (
    <PageWrapper>
      {component}
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
