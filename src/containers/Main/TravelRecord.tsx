import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import React from "react";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { travelRecordType, useTravelRecord } from "../../hooks/useTravelRecord";
import { getVenueName } from "../../utils/qr";
import dayjs from "dayjs";
import DeleteIcon from "@material-ui/icons/Delete";

export const TravelRecord = () => {
  const { travelRecord, removeTravelRecord } = useTravelRecord();

  return (
    <PageWrapper>
      <Header name="出行紀錄" />
      <ContentWrapper>
        <List component="nav">
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
