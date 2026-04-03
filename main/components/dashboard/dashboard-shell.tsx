"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  dashboardNavSections,
  isDashboardSlug,
  type DashboardSlug,
} from "@/components/dashboard/dashboard-content";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function getActiveSlug(pathname: string): DashboardSlug {
  if (pathname === "/dashboard") {
    return "dashboard";
  }

  const slug = pathname.replace("/dashboard/", "");
  return isDashboardSlug(slug) ? slug : "dashboard";
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeSlug = getActiveSlug(pathname);

  return (
    <div className="dashboard-dark-theme app-layout" data-theme="dark">
      <header className="topbar">
        <div className="topbar-logo">
          <div className="logo-icon">🧠</div>
          <span>
            Mind<span className="logo-accent">Well</span>
          </span>
        </div>
        <div className="topbar-actions">
          <Link className="topbar-btn notif-btn" href="/dashboard/alerts" title="Alerts">
            🔔
          </Link>
          <button className="topbar-btn" title="Theme">
            ☀️
          </button>
          <Link href="/dashboard/profile" title="Profile">
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <aside className="sidebar">
        <Card className="sidebar-score-card">
          <CardContent>
            <div className="sidebar-score-label">Wellness Score</div>
            <div className="sidebar-score-value">72</div>
            <div className="sidebar-score-sub">Moderate - Keep going!</div>
            <Progress value={72} />
          </CardContent>
        </Card>

        <nav className="sidebar-nav">
          {dashboardNavSections.map((section) => (
            <div key={section.label}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map((item) => (
                <Link
                  className={cn(
                    "nav-item",
                    activeSlug === item.slug && "active",
                    item.className,
                  )}
                  href={item.href}
                  key={item.slug}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
