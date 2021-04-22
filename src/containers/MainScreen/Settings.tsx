import {
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import packageJson from "../../../package.json";
import { Header } from "../../components/Header";
import { languageType } from "../../constants/languageType";
import { useCamera } from "../../hooks/useCamera";
import { useI18n } from "../../hooks/useI18n";
import { useTravelRecord } from "../../hooks/useTravelRecord";
import { clearAllData } from "../../utils/clearAllData";

export const Settings = () => {
  const { t } = useTranslation("main_screen");
  const { hasCameraSupport } = useCamera();
  const { incognito, setIncognito } = useTravelRecord();
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useI18n();

  const handleLanguageClick = () => {
    setLanguageOpen(!languageOpen);
  };

  return (
    <PageWrapper>
      <Header name={t("setting.name")} />
      <ContentWrapper>
        <StyledList
          subheader={
            <ListSubheader>{t("setting.section.common")}</ListSubheader>
          }
        >
          {hasCameraSupport ? (
            <StyledLink to="/cameraSetting">
              <ListItem button>
                <ListItemText primary={t("setting.item.camera_setting")} />
              </ListItem>
            </StyledLink>
          ) : (
            <ListItem button disabled>
              <ListItemText primary={t("setting.item.camera_setting")} />
            </ListItem>
          )}
          <StyledLink to="/confirmPageSetting">
            <ListItem button>
              <ListItemText primary={t("setting.item.confirm_page_setting")} />
            </ListItem>
          </StyledLink>
          <ListItem>
            <ListItemText
              primary={t("setting.item.incognito_mode.name")}
              secondary={t("setting.item.incognito_mode.explanation")}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={incognito}
                onChange={(e) => {
                  setIncognito(e.target.checked);
                }}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={handleLanguageClick}>
            <ListItemText primary={t("setting.item.language")} />
            {languageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={languageOpen} timeout="auto" unmountOnExit>
            <ListItem>
              <RadioGroup
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
                />
              </RadioGroup>
            </ListItem>
          </Collapse>
        </StyledList>
        <Divider />
        <StyledList
          subheader={<ListSubheader>{t("setting.section.lab")}</ListSubheader>}
        >
          <StyledLink to="/qrGenerator">
            <ListItem button>
              <ListItemText primary={t("setting.item.qr_generator")} />
            </ListItem>
          </StyledLink>
          <ListItem button>
            <ListItemText
              primary={t("setting.item.reset")}
              onClick={clearAllData}
            />
          </ListItem>
        </StyledList>
        <Divider />
        <StyledList
          subheader={
            <ListSubheader>
              {t("setting.section.version")}: {packageJson.version}
            </ListSubheader>
          }
        >
          <StyledExternalLink
            href="https://gitlab.com/codogo-b/back-home-safe"
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary={t("setting.item.about_us")} />
            </ListItem>
          </StyledExternalLink>
          <StyledLink to="/disclaimer">
            <ListItem button>
              <ListItemText primary={t("setting.item.disclaimer")} />
            </ListItem>
          </StyledLink>
          <StyledExternalLink
            href="https://gitlab.com/codogo-b/back-home-safe/-/blob/master/CHANGELOG.md"
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary={t("setting.item.change_log")} />
            </ListItem>
          </StyledExternalLink>
          <StyledExternalLink
            href="https://gitlab.com/codogo-b/back-home-safe/-/issues"
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary={t("setting.item.report_issue")} />
            </ListItem>
          </StyledExternalLink>
        </StyledList>
      </ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const StyledLink = styled(Link)`
  color: unset;
`;

const StyledExternalLink = styled.a`
  color: unset;
`;

const StyledList = styled(List)`
  background-color: #fff;
`;
