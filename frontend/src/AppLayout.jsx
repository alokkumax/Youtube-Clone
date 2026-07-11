import { useState } from "react";
import { Outlet } from "react-router-dom";
import { sampleChannels } from "./services/channels";

// This layout holds shared state for channels and uploaded videos
function AppLayout() {
  const [channels, setChannels] = useState(sampleChannels);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  return (
    <Outlet
      context={{
        channels,
        setChannels,
        uploadedVideos,
        setUploadedVideos,
      }}
    />
  );
}

export default AppLayout;
