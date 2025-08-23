"use client"

export function Footer() {
  return (
    <footer className="w-full fixed bottom-0 left-0 z-40" style={{ backgroundColor: "#A6B28B" }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center items-center">
        <span
          style={{
            color: "#A6B28B",
            fontFamily: "Bookman Old Style, serif",
            fontWeight: "bold",
            fontSize: "1rem",
            background: "transparent",
          }}
        >
          Medical Training Platform
        </span>
      </div>
    </footer>
  )
}
