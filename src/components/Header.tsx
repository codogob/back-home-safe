import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import back from "../assets/back.svg";

type Props = {
  name: string;
  backPath?: string;
};

export const Header = ({ name, backPath }: Props) => {
  return (
    <Wrapper>
      {backPath && (
        <Link to={backPath}>
          <BackButton src={back} />
        </Link>
      )}
      {name}
    </Wrapper>
  );
};

const BackButton = styled.img`
  height: 20px;
  top: 14px;
  left: 16px;
  position: absolute;
`;

const Wrapper = styled.div`
  color: #ffffff;
  background-color: #12b188;
  text-align: center;
  line-height: 48px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  flex-shrink: 0;
`;
