import React from "react"
import Layout from "../components/layout"
import Instructions from "../components/instructions"
import DownloadForm from "../components/download-form"

export default function Home() {
  return (
    <Layout>
      <Instructions />
      <DownloadForm />
    </Layout>
  )
}
