import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Track viewport to switch between desktop/mobile layouts
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const barStyle = {
    backgroundColor: "#1976d2", // BLUE BAR (full width)
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const containerStyle = {
    maxWidth: "1200px", // keeps navbar content centered and limited in width
    margin: "0 auto",
    width: "100%",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "transparent", // transparent so the BLUE BAR shows through
    borderRadius: "8px",            // Rounded edges (visual inside the blue bar)
    margin: "0",                    // no extra margin inside the bar
    color: "#fff",
  };

  const linkStyle = {
    padding: "6px 14px",
    margin: "0 6px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#fff",               // white text on blue
    fontWeight: "500",
    transition: "all 0.3s ease",
  };

  const linkHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; // subtle white tint
  };
  const linkHoverOut = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const burgerStyle = {
    border: "none",
    background: "transparent",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "6px",
  };

  // Desktop (links inline) vs Mobile (hamburger + collapsible links)
  const linksWrapperStyle = isMobile
    ? {
        display: menuOpen ? "flex" : "none",
        flexDirection: "column",
        gap: "8px",
        paddingTop: "10px",
      }
    : { display: "flex", gap: "10px" };

  return (
    <div style={barStyle}>
      <div style={containerStyle}>
        <nav style={navStyle}>
          {/* Left section: brand + (optional) burger on mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              to="/"
              style={{ ...linkStyle, padding: "6px 10px", margin: 0, fontWeight: 700 }}
              onMouseOver={linkHover}
              onMouseOut={linkHoverOut}
            >
              Task Tracker
            </Link>

            {isMobile && (
              <button
                aria-label="Toggle menu"
                onClick={() => setMenuOpen((s) => !s)}
                style={burgerStyle}
                title="Menu"
              >
                ☰
              </button>
            )}
          </div>

          {/* Right section: theme button on desktop; on mobile it stays here too */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link to="/" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkHoverOut}>
                Home
              </Link>
              <Link to="/about" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkHoverOut}>
                About
              </Link>
              <Link
                to="/settings"
                style={linkStyle}
                onMouseOver={linkHover}
                onMouseOut={linkHoverOut}
              >
                Settings
              </Link>
            </div>
          )}
        </nav>

        {/* Collapsible mobile menu */}
        {isMobile && (
          <div style={{ padding: "0 24px 12px" }}>
            <div style={linksWrapperStyle}>
              <Link to="/" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkHoverOut} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkHoverOut} onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/settings" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkHoverOut} onClick={() => setMenuOpen(false)}>
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;