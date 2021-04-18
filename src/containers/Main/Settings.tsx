import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { useCamera } from "../../hooks/useCamera";
import { clearAllData } from "../../utils/clearAllData";
import packageJson from "../../../package.json";

export const Settings = () => {
  const { hasCameraSupport } = useCamera();
  return (
    <PageWrapper>
      <Header name="設定" />
      <ContentWrapper>
        <List component="nav" subheader={<ListSubheader>常用</ListSubheader>}>
          {hasCameraSupport ? (
            <StyledLink to="/cameraSetting">
              <ListItem button>
                <ListItemText primary="相機設定" />
              </ListItem>
            </StyledLink>
          ) : (
            <ListItem button disabled>
              <ListItemText primary="相機設定" />
            </ListItem>
          )}
          <StyledLink to="/disclaimer">
            <ListItem button>
              <ListItemText primary="免責聲明" />
            </ListItem>
          </StyledLink>
        </List>
        <Divider />
        <List component="nav" subheader={<ListSubheader>實驗室</ListSubheader>}>
          <StyledLink to="/qrGenerator">
            <ListItem button>
              <ListItemText primary="生成二維碼" />
            </ListItem>
          </StyledLink>
          <ListItem button>
            <ListItemText primary="重設所有資料" onClick={clearAllData} />
          </ListItem>
        </List>
        <Divider />
        <List
          component="nav"
          subheader={<ListSubheader>版本: {packageJson.version}</ListSubheader>}
        >
          <StyledExternalLink
            href="https://gitlab.com/codogo-b/back-home-safe/-/blob/master/CHANGELOG.md"
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary="更新紀錄" />
            </ListItem>
          </StyledExternalLink>
          <StyledExternalLink
            href="https://gitlab.com/codogo-b/back-home-safe/-/issues"
            target="_blank"
          >
            <ListItem button>
              <ListItemText primary="回報問題" />
            </ListItem>
          </StyledExternalLink>
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

const StyledLink = styled(Link)`
  color: unset;
`;

const StyledExternalLink = styled.a`
  color: unset;
`;
