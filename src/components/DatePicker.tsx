import React, { forwardRef, useImperativeHandle, useState } from "react";

import styled from "styled-components";
import Picker from "pickerjs";
import "pickerjs/dist/picker.min.css";

export type DatePickerHandler = {
  init: () => void;
  getValue: () => Date;
};

export const DatePicker = forwardRef((props: any, ref: any) => {
  const [pickerInstance, setPickerInstance] = useState<Picker | null>(null);

  // mount effect wont work on model, need to call this after onAfterOpen event
  useImperativeHandle(ref, () => ({
    init: () => {
      const ele = document.querySelector(
        ".js-inline-picker"
      ) as HTMLElement | null;
      if (!ele) return;
      setPickerInstance(
        new Picker(ele, {
          inline: true,
          rows: 2,
          pick: (e) => {
            console.log(e);
          },
        })
      );
    },
    getValue: () => {
      if (!pickerInstance) return "";
      return pickerInstance.getDate();
    },
  }));

  return (
    <Wrapper>
      <div className="js-inline-picker" />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  & .picker {
    font-size: 12px;
  }

  & .picker-dialog {
    border: 0;
  }

  & .picker-cell:before {
    background-image: unset;
  }

  & .picker-cell:after {
    background-image: unset;
  }

  & .picker-picked {
    color: unset;
    border-top: #12b188 1px solid;
    border-bottom: #12b188 1px solid;
  }

  & .picker-cell {
    padding: 0 4px;
  }

  & .picker-item {
    padding: 3px 0px;
  }

  & .picker-cell + .picker-cell {
    border: 0;
  }
`;
