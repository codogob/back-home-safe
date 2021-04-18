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
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import StoreIcon from "@material-ui/icons/Store";
import dayjs from "dayjs";
import { isEmpty } from "ramda";
import React from "react";
import styled from "styled-components";

import { Header } from "../../components/Header";
import { travelRecordType, useTravelRecord } from "../../hooks/useTravelRecord";
import { getVenueName } from "../../utils/qr";

export const TravelRecord = () => {
  const { travelRecord, removeTravelRecord } = useTravelRecord();

  return (
    <PageWrapper>
      <Header name="出行紀錄" />
      <ContentWrapper>
        <List component="nav">
          {isEmpty(travelRecord) && <Msg>沒有出行紀錄</Msg>}
          {travelRecord.map((item, index) => {
            const name = getVenueName(item);
            return (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {item.type === travelRecordType.TAXI ? (
                      <LocalTaxiIcon />
                    ) : (
                      <StoreIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={`${dayjs(item.inTime).format(
                      "YYYY-MM-DD HH:mm"
                    )} - ${
                      item.outTime
                        ? dayjs(item.outTime).format("YYYY-MM-DD HH:mm")
                        : ""
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeTravelRecord(index);
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
