import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { languageType } from "../../constants/languageType";
import { useI18n } from "../../hooks/useI18n";

export const Language = () => {
  const { t } = useTranslation("tutorial");
  const { language, setLanguage } = useI18n();

  return (
    <Wrapper>
      <h2>{t("language.name")}</h2>
      <StyledRadioGroup
        aria-label="language"
        name="language"
        value={language}
        onChange={(event) => {
          setLanguage(event.target.value as languageType);
        }}
      >
        <FormControlLabel
          value={languageType["ZH-HK"]}
          control={<Radio />}
          label="繁體中文"
        />
        <FormControlLabel
          value={languageType.EN}
          control={<Radio />}
          label="English"
          disabled
        />
      </StyledRadioGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }

  & input {
    text-align: center;
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  &.MuiFormGroup-root {
    display: block;
  }
`;
