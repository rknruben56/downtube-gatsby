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
      downloadVideo();
    } else {
      setIsInvalid(true);
    }
  }

  // const openDownloadLink = () => {
  //   const videoId = url.match(/v=([^&]*)/)[1]
  //   window.open(`${process.env.GATSBY_API_URL}/download?videoId=${videoId}`, "_blank");
  // }

  const downloadVideo = async () => {
    const response = await fetch(`${process.env.API_URL}/download`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ video: url })
    })
    if (response.status === 201) {
      setIsLoading(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div id="urlInput" className="form-group">
        <label htmlFor="url">YouTube URL</label>
        <input name="url" className="form-control" value={url} onChange={e => setUrl(e.target.value)} />
        {isInvalid && <div style={{ color: `red` }}>
          Please enter a valid YouTube URL
        </div>}
      </div>
      {!isLoading && <button type="submit" className="btn btn-large btn-primary">Download</button>}
      {isLoading &&
        <div className="spinner-border" role="status">
          <span className="sr-only">Downloading! Please don't close or refresh the page...</span>
        </div>
      }
    </form>
  )
}
