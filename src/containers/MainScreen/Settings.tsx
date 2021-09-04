import {
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { range } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Header } from "../../components/Header";
import { languageType } from "../../constants/languageType";
import { useBookmarkLocation } from "../../hooks/useBookmark";
import { useCamera } from "../../hooks/useCamera";
import { useI18n } from "../../hooks/useI18n";
import { useTravelRecord } from "../../hooks/useTravelRecord";
import { clearAllData } from "../../utils/clearAllData";

export const Settings = () => {
  const { t } = useTranslation("main_screen");
  const { hasCameraSupport } = useCamera();
  const {
    incognito,
    setIncognito,
    autoRemoveRecordDay,
    setAutoRemoveRecordDay,
    travelRecord,
  } = useTravelRecord();
  const { bookmarkLocation } = useBookmarkLocation();
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useI18n();

  const handleLanguageClick = () => {
    setLanguageOpen(!languageOpen);
  };

  const handleExportData = () => {
    const data = {
      travelRecord,
      bookmarkLocation,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
            <ListItemText primary={t("setting.item.auto_delete_record")} />
            <ListItemSecondaryAction>
              <Select
                labelId="cameraId"
                id="demo-simple-select"
                value={autoRemoveRecordDay}
                onChange={(e) => {
                  setAutoRemoveRecordDay(e.target.value as number);
                }}
              >
                {range(1, 100).map((day) => (
                  <MenuItem value={day} key={day}>
                    {day}{" "}
                    {day === 1 ? t("setting.form.day") : t("setting.form.days")}
                  </MenuItem>
                ))}
              </Select>
            </ListItemSecondaryAction>
          </ListItem>
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
          <StyledLink to="/vaccinationQRReader">
            <ListItem button>
              <ListItemText primary={t("setting.item.vaccinationQRReader")} />
            </ListItem>
          </StyledLink>
          <ListItem onClick={handleExportData}>
            <ListItemText primary={t("setting.item.export_data")} />
          </ListItem>
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
              {t("setting.section.version")}: {__APP_VERSION__}
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
