import React, { useState } from "react"

export default function DownloadForm(props) {
  const validUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  const [url, setUrl] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validUrlRegex.test(url)) {
      setIsInvalid(false);
      transcodeVideo();
    } else {
      setIsInvalid(true);
    }
  }

  const transcodeVideo = () => {
    const videoId = url.match(/v=([^&]*)/)[1]
    setIsLoading(true);
    fetch(`${process.env.GATSBY_API_URL}/transcode/${videoId}`)
      .then(response => response.json())
      .then(body => {
        setIsLoading(false);
        props.onTranscode(body.mp3Key);
      });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div id="urlInput" className="form-group">
        <label htmlFor="url">YouTube URL</label>
        <input name="url" className="form-control" value={url} onChange={e => setUrl(e.target.value)}/>
        {isInvalid && <div style={{ color: `red` }}>
          Please enter a valid YouTube URL
        </div>}
      </div>
      {!isLoading && <button type="submit" className="btn btn-large btn-primary" disabled={props.isDisabled}>Download</button>}
      {isLoading &&
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }
    </form>
  )
}