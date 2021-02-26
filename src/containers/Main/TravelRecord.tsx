import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import React from "react";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { useTravelRecord } from "../../hooks/useTravelRecord";
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
              <>
                <ListItem key={index}>
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
              </>
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
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
