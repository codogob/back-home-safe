import React from "react";
import styled from "styled-components";
import checkbox from "../assets/checkbox.svg";
import checkboxChecked from "../assets/checkboxChecked.svg";
import { isAndroid } from "react-device-detect";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const CheckBox = ({ onChange, checked }: Props) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return isAndroid ? (
    <StyledCheckbox type="checkbox" checked={checked} onClick={handleClick} />
  ) : (
    <IOSCheckBox
      src={checked ? checkboxChecked : checkbox}
      onClick={handleClick}
    />
  );
};

const IOSCheckBox = styled.img`
  height: 32px;
  display: inline-block;
  vertical-align: top;
  margin: 0 8px;
`;

const StyledCheckbox = styled.input`
  display: inline-block;
  vertical-align: top;
  margin: 0 8px;
  height: 32px;
  transform: scale(1.5);
`;
