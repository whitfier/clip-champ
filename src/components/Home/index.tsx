import React from "react";
import { useHistory } from "react-router-dom";
import { Input, Typography, Layout } from "antd";
import styles from "./styles.module.css";

const { Footer, Content } = Layout;
const { Search } = Input;
const { Text, Title } = Typography;

const Home: React.FC = () => {
  const history = useHistory();

  const handleSearch = (vodUrl: String) => {
    const matches = vodUrl.match(/https:\/\/www\.twitch\.tv\/videos\/(\d+)/);
    if (matches) {
      const vodId = matches[1];
      history.push(`/vod/${vodId}`);
    } else {
      console.error("Invalid url");
    }
  };

  return (
    <div className={styles.home}>
      <Layout>
        <Content className={styles.content}>
          <div className={styles.search}>
            <Title>Automatically generate highlights from a Twitch VOD</Title>
            <Search
              className={styles.searchBar}
              placeholder="ex: https://www.twitch.tv/videos/537743774"
              enterButton="Generate"
              size="large"
              onSearch={handleSearch}
            />
          </div>
        </Content>
        <Footer className={styles.footer}>
          <Text>Created by whitfier</Text>
        </Footer>
      </Layout>
    </div>
  );
};

export default Home;
