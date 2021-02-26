import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const PageLoading = () => (
  <FixWrapper>
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  </FixWrapper>
);

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
