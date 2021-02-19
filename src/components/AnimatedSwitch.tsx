import React from "react";
import { AnimatedSwitch as Switch, spring } from "react-router-transition";

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
    <Switch
      {...props}
      atEnter={{ opacity: 1, offset: 100, zIndex: 100 }}
      atLeave={{
        opacity: 0,
        offset: 0,
      }}
      atActive={{ opacity: 1, offset: glide(0) }}
      className="switch-wrapper"
      mapStyles={(styles) => ({
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        transform: `translateX(${styles.offset}%)`,
      })}
    />
  );
};
