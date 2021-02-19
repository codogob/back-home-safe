import React from "react";
import { AnimatedSwitch as Switch, spring } from "react-router-transition";
import styled from "styled-components";

const glide = (val: number) =>
  spring(val, {
    stiffness: 174,
    damping: 24,
  });

type Props = {
  children: React.ReactNode;
};

export const AnimatedSwitch = (props: Props) => {
  return (
    <StyledSwitch
      {...props}
      atEnter={{ opacity: 1, offset: 100, zIndex: 100 }}
      atLeave={{
        opacity: 0,
        offset: 0,
      }}
      atActive={{ opacity: 1, offset: glide(0) }}
      mapStyles={(styles) => ({
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        transform: `translateX(${styles.offset}%)`,
      })}
    />
  );
};

const StyledSwitch = styled(Switch)`
  position: relative;
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #12b188;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  }
`;
