import React, { useState } from "react"

import Layout from "../components/layout"
import Instructions from "../components/instructions"
import DownloadForm from "../components/download-form"
import ProgressBar from "../components/progress-bar"

export default function Home() {
  const initialTime = Date.now();
  const interval = 1000;
  const [progress, setProgress] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const onTranscode = (mp3Key) => {
    const url = `${process.env.GATSBY_API_URL}/signed-url/${encodeURIComponent(mp3Key)}`;
    setIsFormDisabled(true);
    updateProgress(url);
  }

  // Because the mp3 takes awhile to upload to s3, need to set a fake
  // progress bar to returned the signed url
  const updateProgress = (url) => {
    const status = Math.min(1, (Date.now() - initialTime) / process.env.GATSBY_WAIT_TIME);
    if (status !== 1) {
      setProgress(status * 100);
      setTimeout(function() { updateProgress(url) }, interval);
    } else {
      setProgress(0);
      setIsFormDisabled(false);
      getDownloadedMp3(url);
    }
  }

  const getDownloadedMp3 = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(body => {
        window.location = body.url;
      });
  }

  return (
    <Layout>
      <Instructions />
      <DownloadForm isDisabled={isFormDisabled} onTranscode={onTranscode} />
      {progress > 0 && <ProgressBar progress={progress} />}
    </Layout>
  )
}
