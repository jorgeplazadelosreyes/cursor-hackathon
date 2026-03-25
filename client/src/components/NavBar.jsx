import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg transition-shadow",
          "hover:bg-white/60",
          isActive ? "bg-white/70 shadow-calm" : "",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-warm/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-sage flex items-center justify-center text-ink font-semibold">
            C
          </div>
          <div className="leading-tight">
            <div className="text-ink font-semibold">CalmApply</div>
            <div className="text-muted text-sm">Job search, calmer.</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-ink">
          <NavItem to="/search" label="Search Jobs" />
          <NavItem to="/tracker" label="My Applications" />
        </nav>
      </div>
    </header>
  );
}
