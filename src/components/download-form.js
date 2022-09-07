import React, { useState } from "react"

export default function DownloadForm(props) {
  const validUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  const [url, setUrl] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validUrlRegex.test(url)) {
      setIsInvalid(false);
      openDownloadLink();
    } else {
      setIsInvalid(true);
    }
  }

  const openDownloadLink = () => {
    const videoId = url.match(/v=([^&]*)/)[1]
    window.open(`${process.env.GATSBY_API_URL}/download?videoId=${videoId}`, "_blank");
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
      <button type="submit" className="btn btn-large btn-primary">Download</button>
    </form>
  )
}