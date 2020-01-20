import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Progress } from "antd";
import styles from "./styles.module.css";
import twitch from "../../twitch";

const { Text, Title } = Typography;

interface VideosResponse {
  data: [VideoDetails];
  pagination: any;
}

interface VideoDetails {
  id: string;
  title: string;
  thumbnail_url: string;
  user_name: string;
}

const Vod: React.FC = () => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const { id } = useParams();

  useEffect(() => {
    twitch
      .get<VideosResponse>("/videos", {
        params: {
          id: id
        }
      })
      .then(response => {
        console.log(response.data);
        setVideoDetails(response.data.data[0]);
      });
  }, [id]);

  if (!videoDetails) return null;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.preview}>
        <img
          alt="thumbnail"
          src={videoDetails.thumbnail_url
            .replace("%{width}", "160")
            .replace("%{height}", "90")}
        />
        <div className={styles.previewDetails}>
          <Text strong>{videoDetails.user_name}</Text>
          <Text>{videoDetails.title}</Text>
        </div>
      </div>
      <Title>Generating highlights...</Title>
      <Progress
        className={styles.progressBar}
        percent={50}
        status="active"
        showInfo={false}
      />
    </div>
  );
};

export default Vod;
