import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import { Home } from "./Home";

enum tabs {
  HOME = "HOME",
}

const tabsArr = [
  {
    key: tabs.HOME,
    component: <Home />,
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
