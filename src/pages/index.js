import React from "react"

import Layout from "../components/layout"
import DownloadForm from "../components/download-form"

export default function Home() {
  return (
    <Layout>
      <p>
        Steps to download a song
      </p>
      <ul>
        <li>Find a song you like on YouTube</li>
        <li>Copy the URL</li>
        <li>Paste the URL in the text box (right click works!)</li>
        <li>Click download</li>
        <li>Wait for it to finish converting to an mp3</li>
        <li>You should get a popup saying if you want to save it. If not, it's in your Downloads folder</li>
        <li>If you click on the mp3 file, it should automatically add to iTunes</li>
        <li>Enjoy! Love, Junior</li>
      </ul>
      <DownloadForm />
    </Layout>
  )
}
