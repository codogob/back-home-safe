import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Prevent flash
// ref: https://github.com/gregberge/loadable-components/issues/322
export const PageLoading = () => {
  const delay = 200; // 200ms
  const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingIndicatorVisibility(true), delay);

    // this will clear Timeout when component unmont like in willComponentUnmount
    return () => {
      clearTimeout(timer);
    };
  });

  return showLoadingIndicator ? (
    <FixWrapper>
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    </FixWrapper>
  ) : null;
};

const FixWrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(
    -50%,
    -50%
  ); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
`;
