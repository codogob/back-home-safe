import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import StoreIcon from "@material-ui/icons/Store";
import { isEmpty } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Header } from "../../components/Header";
import { locationType, useBookmarkLocation } from "../../hooks/useBookmark";
import { useI18n } from "../../hooks/useI18n";
import {
  travelRecordInputType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";

export const Bookmark = () => {
  const { t } = useTranslation("main_screen");
  const { bookmarkLocation, removeBookmarkLocation } = useBookmarkLocation();
  const { language } = useI18n();
  const { enterLocation } = useTravelRecord();

  return (
    <PageWrapper>
      <Header name={t("bookmark.name")} />
      <ContentWrapper>
        <List component="nav">
          {isEmpty(bookmarkLocation) && (
            <Msg>{t("bookmark.message.empty")}</Msg>
          )}
          {bookmarkLocation.map((item) => {
            const name = getVenueName(item, language);
            return (
              <React.Fragment key={item.id}>
                <ListItem dense>
                  <ListItemIcon>
                    {item.type === locationType.TAXI ? (
                      <LocalTaxiIcon />
                    ) : (
                      <StoreIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="enter"
                      onClick={() => {
                        enterLocation({
                          ...item,
                          inputType: travelRecordInputType.BOOKMARK,
                        });
                      }}
                    >
                      <ExitToAppIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeBookmarkLocation(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
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

const Msg = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
  line-height: 48px;
`;
