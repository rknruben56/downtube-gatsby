import React from "react"

export default function Layout({ children })  {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem`}}>
      <h1>DownTube</h1>
      {children}
    </div>
  )
}