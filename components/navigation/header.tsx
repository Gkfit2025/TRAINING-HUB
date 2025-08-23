"use client"

import React from "react"

export function Footer() {
  return (
    <footer className="w-full mt-10" style={{ background: "#A6B28B" }}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center">
        <span
          className="text-lg font-semibold tracking-wide text-center"
          style={{
            color: "#001BB7",
            fontFamily: "Bookman Old Style, serif",
            letterSpacing: "0.02em",
          }}
        >
          Medical Training Platform<br />
          Staff Education Program
        </span>
      </div>
    </footer>
  )
}
