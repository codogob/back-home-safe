import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { useCamera } from "../../hooks/useCamera";
import { clearAllData } from "../../utils/clearAllData";

export const Settings = () => {
  const { hasCameraSupport } = useCamera();
  return (
    <PageWrapper>
      <Header name="設定" />
      <ContentWrapper>
        <List component="nav">
          <StyledLink to="/qrGenerator">
            <ListItem button>
              <ListItemText primary="生成二維碼" />
            </ListItem>
          </StyledLink>
          <Divider />
          {hasCameraSupport && (
            <StyledLink to="/cameraSetting">
              <ListItem button>
                <ListItemText primary="相機設定" />
              </ListItem>
            </StyledLink>
          )}
          <Divider />
          <StyledLink to="/disclaimer">
            <ListItem button>
              <ListItemText primary="免責聲明" />
            </ListItem>
          </StyledLink>
          <Divider />
          <ListItem button>
            <ListItemText primary="重設所有資料" onClick={clearAllData} />
          </ListItem>
          <Divider />
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

const StyledLink = styled(Link)`
  color: unset;
`;
