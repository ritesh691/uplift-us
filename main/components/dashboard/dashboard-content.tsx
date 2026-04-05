import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type DashboardSlug =
  | "dashboard"
  | "mood-check-in"
  | "assessment"
  | "trends"
  | "journal"
  | "habit-tracker"
  | "suggestions"
  | "alerts"
  | "profile"
  | "crisis-support"
  | "sign-out";

type NavItem = {
  slug: DashboardSlug;
  href: string;
  label: string;
  icon: string;
  badge?: string;
  className?: string;
};

export const dashboardNavSections: Array<{
  label: string;
  items: NavItem[];
}> = [
  {
    label: "Main",
    items: [
      { slug: "dashboard", href: "/dashboard", label: "Dashboard", icon: "📊" },
      {
        slug: "mood-check-in",
        href: "/dashboard/mood-check-in",
        label: "Mood Check-In",
        icon: "😊",
      },
      {
        slug: "assessment",
        href: "/dashboard/assessment",
        label: "Assessment",
        icon: "📋",
      },
      { slug: "trends", href: "/dashboard/trends", label: "Trends", icon: "📈" },
    ],
  },
  {
    label: "Wellness",
    items: [
      { slug: "journal", href: "/dashboard/journal", label: "Journal", icon: "📓" },
      {
        slug: "habit-tracker",
        href: "/dashboard/habit-tracker",
        label: "Habit Tracker",
        icon: "✅",
      },
      {
        slug: "suggestions",
        href: "/dashboard/suggestions",
        label: "Suggestions",
        icon: "💡",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        slug: "alerts",
        href: "/dashboard/alerts",
        label: "Alerts",
        icon: "🔔",
        badge: "3",
      },
      { slug: "profile", href: "/dashboard/profile", label: "Profile", icon: "👤" },
      {
        slug: "crisis-support",
        href: "/dashboard/crisis-support",
        label: "Crisis Support",
        icon: "🆘",
        className: "nav-crisis",
      },
      {
        slug: "sign-out",
        href: "/dashboard/sign-out",
        label: "Sign Out",
        icon: "🚪",
        className: "nav-logout",
      },
    ],
  },
];

export function isDashboardSlug(slug: string): slug is DashboardSlug {
  return dashboardNavSections
    .flatMap((section) => section.items)
    .some((item) => item.slug === slug);
}

export function DashboardPageContent({ slug }: { slug: DashboardSlug }) {
  switch (slug) {
    case "dashboard":
      return <DashboardOverview />;
    case "mood-check-in":
      return <MoodCheckInPage />;
    case "assessment":
      return <AssessmentPage />;
    case "trends":
      return <TrendsPage />;
    case "journal":
      return <JournalPage />;
    case "habit-tracker":
      return <HabitTrackerPage />;
    case "suggestions":
      return <SuggestionsPage />;
    case "alerts":
      return <AlertsPage />;
    case "profile":
      return <ProfilePage />;
    case "crisis-support":
      return <CrisisSupportPage />;
    case "sign-out":
      return <SignOutPage />;
    default:
      return null;
  }
}

function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function DashboardOverview() {
  return (
    <section className="page-route">
      <PageHeader
        title="Good morning, Alex 👋"
        subtitle="Here's your wellness overview for today"
        action={
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/dashboard/mood-check-in"
          >
            Log Today&apos;s Mood
          </Link>
        }
      />

      <div className="alert-banner alert-spotlight mb-20">
        <span className="alert-icon">⚠️</span>
        <div>
          <strong>Stress Pattern Detected</strong>
          Your stress has been elevated for 5 days. Consider a breathing exercise or mindfulness
          break.
          <div style={{ marginTop: 10 }}>
            <Link className="btn-sm" href="/dashboard/suggestions">
              Try Breathing →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid-4">
        {[
          {
            icon: "🧠",
            value: "72",
            label: "Wellness Score",
            change: "↑ +4 this week",
            changeClass: "positive",
            accent: "#3b82f6",
            background: "rgba(59,130,246,0.15)",
          },
          {
            icon: "😊",
            value: "—",
            label: "Today's Mood",
            change: "Not logged yet",
            changeClass: "neutral",
            accent: "#10b981",
            background: "rgba(16,185,129,0.15)",
          },
          {
            icon: "😰",
            value: "Mod",
            label: "Anxiety Level",
            change: "↓ Better than yesterday",
            changeClass: "positive",
            accent: "#f59e0b",
            background: "rgba(245,158,11,0.15)",
          },
          {
            icon: "🌙",
            value: "6.5h",
            label: "Avg Sleep",
            change: "↓ Below goal",
            changeClass: "negative",
            accent: "#ef4444",
            background: "rgba(239,68,68,0.15)",
          },
        ].map((item) => (
          <Card
            className="stat-card"
            key={item.label}
            style={{ ["--card-accent" as string]: item.accent }}
          >
            <div className="stat-icon" style={{ background: item.background }}>
              {item.icon}
            </div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
            <div className={cn("stat-change", item.changeClass)}>{item.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid-2">
        <Card>
          <CardHeader>
            <CardTitle>Wellness Score</CardTitle>
            <Badge variant="warn">Moderate</Badge>
          </CardHeader>
          <CardContent className="wellness-ring-wrap">
            <svg className="ring-svg" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="ringGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <circle className="ring-track" cx="70" cy="70" r="54" />
              <circle
                className="ring-fill"
                cx="70"
                cy="70"
                r="54"
                style={{ strokeDashoffset: 95 }}
              />
              <text className="ring-value" x="70" y="66">
                72
              </text>
              <text className="ring-unit" x="70" y="82">
                /100
              </text>
            </svg>
            <div className="ring-info">
              <div className="ring-title">Moderate Wellness</div>
              <p className="ring-desc">
                Consistent journaling and breathing practice are helping. Sleep is the biggest
                opportunity this week.
              </p>
              <div className="risk-chip risk-moderate">⚠️ Moderate Risk</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>This Week&apos;s Mood</CardTitle>
          <MoodLineChart />
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <CardTitle>Anxiety Trend</CardTitle>
          <AnxietyBars />
        </Card>

        <Card>
          <CardTitle>Recent Activity</CardTitle>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon" style={{ background: "rgba(59,130,246,0.15)" }}>
                📋
              </div>
              <div className="activity-info">
                <div className="activity-name">Assessment Completed</div>
                <div className="activity-sub">Score: 72, moderate risk · 2 hours ago</div>
              </div>
              <Badge variant="warn">Moderate</Badge>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: "rgba(99,102,241,0.15)" }}>
                📓
              </div>
              <div className="activity-info">
                <div className="activity-name">Journal Entry</div>
                <div className="activity-sub">Wrote about work stress and recovery · Yesterday</div>
              </div>
              <Badge variant="info">Logged</Badge>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: "rgba(16,185,129,0.15)" }}>
                🧘
              </div>
              <div className="activity-info">
                <div className="activity-name">Breathing Exercise</div>
                <div className="activity-sub">5-minute session completed · 2 days ago</div>
              </div>
              <Badge variant="good">Done</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function MoodLineChart() {
  return (
    <div className="chart-panel">
      <div className="chart-scale">
        {[10, 8, 6, 4, 2, 0].map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>
      <div className="line-chart">
        <svg aria-hidden="true" className="line-chart-svg" viewBox="0 0 640 220">
          <defs>
            <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(45,101,255,0.28)" />
              <stop offset="100%" stopColor="rgba(45,101,255,0.04)" />
            </linearGradient>
          </defs>
          <path
            className="chart-area"
            d="M20 140 C70 145, 110 150, 150 160 S240 170, 280 135 S360 120, 410 140 S500 110, 540 100 S590 98, 620 112 L620 190 L20 190 Z"
          />
          <path
            className="chart-line"
            d="M20 140 C70 145, 110 150, 150 160 S240 170, 280 135 S360 120, 410 140 S500 110, 540 100 S590 98, 620 112"
          />
          {[
            [20, 140],
            [110, 150],
            [200, 160],
            [280, 135],
            [410, 140],
            [540, 100],
            [620, 112],
          ].map(([cx, cy]) => (
            <circle className="chart-point" cx={cx} cy={cy} key={`${cx}-${cy}`} r="5.5" />
          ))}
        </svg>
        <div className="chart-labels">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnxietyBars() {
  const bars = [5, 7, 4, 8, 6, 3, 7];

  return (
    <div className="bar-chart">
      <div className="bar-chart-grid">
        {bars.map((value, index) => (
          <div className="bar-chart-col" key={`${value}-${index}`}>
            <div className="bar-chart-track">
              <div className="bar-chart-fill" style={{ height: `${value * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="chart-labels">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
}

function MoodCheckInPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Mood Check-In"
        subtitle="How are you feeling right now?"
      />
      <Card className="mb-20">
        <CardTitle>Select Your Current Mood</CardTitle>
        <div className="mood-grid">
          {[
            ["😊", "Happy"],
            ["😌", "Calm"],
            ["😐", "Neutral"],
            ["😢", "Sad"],
            ["😰", "Anxious"],
            ["😤", "Stressed"],
          ].map(([emoji, label], index) => (
            <button
              className={cn("mood-btn", index === 1 && "selected")}
              key={label}
              type="button"
            >
              <span className="mood-emoji">{emoji}</span>
              <span className="mood-label">{label}</span>
            </button>
          ))}
        </div>
      </Card>
      <Card className="mb-20">
        <CardTitle>Intensity (1-10)</CardTitle>
        <div className="slider-row">
          <span className="slider-label">Mild</span>
          <input
            className="styled-slider"
            defaultValue={5}
            max={10}
            min={1}
            type="range"
          />
          <span className="slider-label">Intense</span>
          <span className="slider-val">5</span>
        </div>
      </Card>
      <Card className="mb-20">
        <CardTitle>Add a Note</CardTitle>
        <Textarea placeholder="What's contributing to this mood? Any triggers or thoughts..." />
      </Card>
      <button className={buttonVariants({ variant: "default", className: "full-width" })}>
        Save Today&apos;s Mood
      </button>
    </section>
  );
}

function AssessmentPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Mental Health Assessment"
        subtitle="Answer honestly. All data is private and encrypted."
      />
      <div className="question-card">
        <div className="q-progress-wrap">
          <Progress className="q-progress-bar" indicatorClassName="q-progress-fill" value={60} />
          <div className="q-counter">Question 6 of 10</div>
        </div>
        <h2 className="question-text">
          Over the last 2 weeks, how often have you felt overwhelmed by daily responsibilities?
        </h2>
        <div className="question-options">
          {[
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ].map((option, index) => (
            <div className={cn("q-option", index === 1 && "selected")} key={option}>
              <span className="q-dot" />
              {option}
            </div>
          ))}
        </div>
        <div className="q-nav">
          <button className={buttonVariants({ variant: "outline" })}>Previous</button>
          <button className="btn-next">Next Question</button>
        </div>
      </div>
      <div className="result-card">
        <div className="result-title">Preview of Your Summary</div>
        <p className="result-desc">
          Early signals point to moderate anxiety with strong self-awareness and improving
          resilience. Sleep and hydration remain the clearest intervention areas.
        </p>
        <div className="result-tags">
          <Badge variant="warn">Moderate Anxiety</Badge>
          <Badge variant="good">Low Sadness</Badge>
          <Badge variant="info">Good Insight</Badge>
        </div>
        <div className="result-actions">
          <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/trends">
            Review Trends
          </Link>
          <Link className="btn-next" href="/dashboard/suggestions">
            View Suggestions
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrendsPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Emotion Trends"
        subtitle="Your emotional history visualized over time"
      />
      <div className="trends-top-grid mb-20">
        <Card>
          <CardTitle>30-Day Wellness Score</CardTitle>
          <TrendScoreChart />
        </Card>
        <Card>
          <CardTitle>Mood Distribution</CardTitle>
          <MoodDonutChart />
        </Card>
      </div>
      <Card className="mb-20">
        <CardTitle>Anxiety and Sadness Levels (14 Days)</CardTitle>
        <AnxietySadnessChart />
      </Card>
      <Card>
        <CardTitle>Assessment History</CardTitle>
        <table className="data-table trends-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Wellness</th>
              <th>Anxiety</th>
              <th>Sadness</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apr 01, 2026</td>
              <td>72</td>
              <td>Moderate</td>
              <td>Low</td>
              <td>
                <Badge variant="warn">Moderate</Badge>
              </td>
            </tr>
            <tr>
              <td>Mar 25, 2026</td>
              <td>68</td>
              <td>High</td>
              <td>Moderate</td>
              <td>
                <Badge variant="danger">High</Badge>
              </td>
            </tr>
            <tr>
              <td>Mar 18, 2026</td>
              <td>81</td>
              <td>Low</td>
              <td>Low</td>
              <td>
                <Badge variant="good">Low</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  );
}

function TrendScoreChart() {
  const yTicks = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
  const xTicks = ["5/3", "9/3", "13/3", "17/3", "21/3", "25/3", "29/3", "2/4"];

  return (
    <div className="trend-chart-wrap">
      <div className="trend-score-grid">
        {yTicks.map((tick) => (
          <div className="trend-score-row" key={tick}>
            <span>{tick}</span>
            <div />
          </div>
        ))}
      </div>
      <svg aria-hidden="true" className="trend-score-svg" viewBox="0 0 820 280">
        <defs>
          <linearGradient id="trendScoreFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(45, 101, 255, 0.22)" />
            <stop offset="100%" stopColor="rgba(45, 101, 255, 0.02)" />
          </linearGradient>
        </defs>
        <path
          className="trend-score-area"
          d="M20 186 L48 176 L76 168 L104 142 L132 88 L160 160 L188 166 L216 165 L244 150 L272 140 L300 165 L328 164 L356 184 L384 136 L412 160 L440 166 L468 146 L496 82 L524 120 L552 86 L580 128 L608 150 L636 142 L664 136 L692 174 L720 124 L748 122 L776 120 L804 88 L820 144 L820 220 L20 220 Z"
        />
        <path
          className="trend-main-line"
          d="M20 186 L48 176 L76 168 L104 142 L132 88 L160 160 L188 166 L216 165 L244 150 L272 140 L300 165 L328 164 L356 184 L384 136 L412 160 L440 166 L468 146 L496 82 L524 120 L552 86 L580 128 L608 150 L636 142 L664 136 L692 174 L720 124 L748 122 L776 120 L804 88 L820 144"
        />
        {[
          [20, 186],
          [48, 176],
          [76, 168],
          [104, 142],
          [132, 88],
          [160, 160],
          [188, 166],
          [216, 165],
          [244, 150],
          [272, 140],
          [300, 165],
          [328, 164],
          [356, 184],
          [384, 136],
          [412, 160],
          [440, 166],
          [468, 146],
          [496, 82],
          [524, 120],
          [552, 86],
          [580, 128],
          [608, 150],
          [636, 142],
          [664, 136],
          [692, 174],
          [720, 124],
          [748, 122],
          [776, 120],
          [804, 88],
          [820, 144],
        ].map(([cx, cy]) => (
          <circle className="trend-score-point" cx={cx} cy={cy} key={`${cx}-${cy}`} r="3.5" />
        ))}
      </svg>
      <div className="trend-x-axis">
        {xTicks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}

function MoodDonutChart() {
  const segments = [
    { label: "Calm", value: "42%", color: "#2d65ff" },
    { label: "Neutral", value: "24%", color: "#14b8a6" },
    { label: "Anxious", value: "18%", color: "#f59e0b" },
    { label: "Sad", value: "10%", color: "#8b5cf6" },
    { label: "Stressed", value: "6%", color: "#ef4444" },
  ];

  return (
    <div className="donut-panel">
      <div className="donut-wrap">
        <div
          aria-hidden="true"
          className="donut-chart"
          style={{
            background:
              "conic-gradient(#2d65ff 0 42%, #14b8a6 42% 66%, #f59e0b 66% 84%, #8b5cf6 84% 94%, #ef4444 94% 100%)",
          }}
        >
          <div className="donut-chart-inner">
            <strong>30</strong>
            <span>Days</span>
          </div>
        </div>
      </div>
      <div className="donut-legend">
        {segments.map((segment) => (
          <div className="donut-legend-item" key={segment.label}>
            <span
              className="donut-legend-dot"
              style={{ backgroundColor: segment.color }}
            />
            <span className="donut-legend-label">{segment.label}</span>
            <span className="donut-legend-value">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnxietySadnessChart() {
  const yTicks = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const xTicks = [
    "21/3",
    "22/3",
    "23/3",
    "24/3",
    "25/3",
    "26/3",
    "27/3",
    "28/3",
    "29/3",
    "30/3",
    "31/3",
    "1/4",
    "2/4",
    "3/4",
  ];

  return (
    <div className="trend-chart-wrap dual-chart-wrap">
      <div className="dual-chart-legend">
        <div className="dual-chart-key">
          <span className="dual-chart-swatch dual-chart-swatch-anxiety" />
          Anxiety
        </div>
        <div className="dual-chart-key">
          <span className="dual-chart-swatch dual-chart-swatch-sadness" />
          Sadness
        </div>
      </div>
      <div className="trend-score-grid dual-score-grid">
        {yTicks.map((tick) => (
          <div className="trend-score-row" key={tick}>
            <span>{tick}</span>
            <div />
          </div>
        ))}
      </div>
      <svg aria-hidden="true" className="trend-score-svg dual-chart-svg" viewBox="0 0 820 260">
        <path
          className="dual-chart-area dual-chart-area-anxiety"
          d="M20 120 C50 150, 80 160, 110 120 S170 110, 200 140 S260 142, 290 140 S350 138, 380 120 S440 110, 470 150 S530 160, 560 148 S620 110, 650 116 S710 118, 740 116 S790 92, 820 74 L820 220 L20 220 Z"
        />
        <path
          className="dual-chart-area dual-chart-area-sadness"
          d="M20 170 C50 132, 80 102, 110 110 S170 180, 200 182 S260 174, 290 140 S350 138, 380 152 S440 190, 470 150 S530 182, 560 188 S620 174, 650 166 S710 198, 740 190 S790 190, 820 188 L820 220 L20 220 Z"
        />
        <path
          className="dual-chart-line dual-chart-line-anxiety"
          d="M20 120 C50 150, 80 160, 110 120 S170 110, 200 140 S260 142, 290 140 S350 138, 380 120 S440 110, 470 150 S530 160, 560 148 S620 110, 650 116 S710 118, 740 116 S790 92, 820 74"
        />
        <path
          className="dual-chart-line dual-chart-line-sadness"
          d="M20 170 C50 132, 80 102, 110 110 S170 180, 200 182 S260 174, 290 140 S350 138, 380 152 S440 190, 470 150 S530 182, 560 188 S620 174, 650 166 S710 198, 740 190 S790 190, 820 188"
        />
        {[
          [20, 120],
          [80, 160],
          [140, 120],
          [200, 140],
          [260, 140],
          [320, 140],
          [380, 140],
          [440, 120],
          [500, 150],
          [560, 148],
          [620, 110],
          [700, 116],
          [760, 116],
          [820, 74],
        ].map(([cx, cy]) => (
          <circle
            className="dual-chart-point dual-chart-point-anxiety"
            cx={cx}
            cy={cy}
            key={`a-${cx}-${cy}`}
            r="4.5"
          />
        ))}
        {[
          [20, 170],
          [80, 102],
          [140, 110],
          [200, 182],
          [260, 174],
          [320, 140],
          [380, 152],
          [440, 190],
          [500, 150],
          [560, 188],
          [620, 174],
          [700, 166],
          [760, 198],
          [820, 188],
        ].map(([cx, cy]) => (
          <circle
            className="dual-chart-point dual-chart-point-sadness"
            cx={cx}
            cy={cy}
            key={`s-${cx}-${cy}`}
            r="4.5"
          />
        ))}
      </svg>
      <div className="trend-x-axis dual-trend-x-axis">
        {xTicks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}

function JournalPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Daily Journal"
        subtitle="Express your thoughts freely. This space is yours."
      />
      <Card className="mb-20">
        <CardTitle>New Entry - April 3, 2026</CardTitle>
        <Textarea placeholder="Write about your day, feelings, thoughts, or anything on your mind..." />
        <div className="journal-controls">
          <select className="form-input journal-mood-select" defaultValue="Anxious 😰">
            <option>Happy 😊</option>
            <option>Calm 😌</option>
            <option>Neutral 😐</option>
            <option>Anxious 😰</option>
            <option>Sad 😢</option>
            <option>Stressed 😤</option>
          </select>
          <button className={buttonVariants({ variant: "secondary" })}>Save Entry</button>
        </div>
      </Card>
      <h3 className="section-label">Previous Entries</h3>
      <div className="journal-entry">
        <div className="journal-entry-header">
          <div className="journal-date">📅 April 1, 2026 · 9:14 PM</div>
          <Badge variant="warn">Anxious 😰</Badge>
        </div>
        <p className="journal-text">
          Had a difficult day at work. My mind kept racing about the upcoming presentation. The
          breathing exercise helped a little, and I want to prioritize sleep tonight.
        </p>
      </div>
      <div className="journal-entry">
        <div className="journal-entry-header">
          <div className="journal-date">📅 March 30, 2026 · 8:30 PM</div>
          <Badge variant="good">Happy 😊</Badge>
        </div>
        <p className="journal-text">
          Great day today. I met friends and spent time outdoors. The sunshine and unstructured time
          really helped lift my mood.
        </p>
      </div>
    </section>
  );
}

function HabitTrackerPage() {
  return (
    <section className="page-route">
      <PageHeader title="Habit Tracker" subtitle="Small habits, big results" />
      <Card className="mb-20">
        <CardTitle>Today&apos;s Habits</CardTitle>
        {[
          ["🌙", "Sleep Hours", "6h", 54],
          ["💧", "Water Intake", "5 glasses", 62],
          ["🏃", "Exercise", "30 min", 50],
          ["📱", "Screen Time", "7h", 72],
          ["🧘", "Meditation", "10 min", 45],
        ].map(([icon, name, value, progress]) => (
          <div className="habit-item" key={name}>
            <div className="habit-icon">{icon}</div>
            <div className="habit-info">
              <div className="habit-name">{name}</div>
              <Progress value={Number(progress)} />
            </div>
            <div className="habit-value">{value}</div>
          </div>
        ))}
        <Separator />
        <button className={buttonVariants({ variant: "default", className: "full-width" })}>
          Save Today&apos;s Habits
        </button>
      </Card>
      <Card>
        <CardTitle>Weekly Habit Overview</CardTitle>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">📊</span>
            <div>
              <strong>Most consistent</strong>
              <p>Hydration has been above target 4 of the last 7 days.</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🌙</span>
            <div>
              <strong>Needs attention</strong>
              <p>Sleep is averaging 6.5 hours, which tracks closely with elevated stress.</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function SuggestionsPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Wellness Suggestions"
        subtitle="Personalized coping strategies just for you"
      />
      <div className="alert-banner alert-info mb-20">
        <span className="alert-icon">💡</span>
        <div>
          <strong>Personalized for you</strong>
          Based on moderate anxiety and below-target sleep in your recent check-ins.
        </div>
      </div>
      <div className="suggestion-grid mb-24">
        {[
          ["🌬️", "Box Breathing", "4-4-4-4 technique to calm anxiety in minutes", "Try now"],
          ["🧘", "Body Scan", "Progressive relaxation from head to toe", "10 min"],
          ["🌿", "Nature Walk", "A short outdoor walk to reset your nervous system", "20 min"],
          ["📖", "Gratitude Journal", "Write 3 things you're grateful for today", "5 min"],
          ["🎵", "Calming Music", "Lo-fi or nature sounds for a reset", "15 min"],
          ["💬", "Talk to Someone", "Share your feelings with a trusted person", "Anytime"],
        ].map(([icon, title, description, tag]) => (
          <Card className="suggestion-card" key={title}>
            <div className="suggestion-icon">{icon}</div>
            <div className="suggestion-title">{title}</div>
            <p className="suggestion-desc">{description}</p>
            <span className="suggestion-tag">{tag}</span>
          </Card>
        ))}
      </div>
      <Card className="mb-20">
        <CardTitle>Box Breathing Exercise</CardTitle>
        <div className="breathing-wrap">
          <div className="breathing-circle inhale">
            <div className="breath-inner">
              <div className="breath-label">Inhale</div>
              <div className="breath-sub">4-4-4-4 technique</div>
            </div>
          </div>
        </div>
        <p style={{ color: "var(--text3)", fontSize: 13, textAlign: "center" }}>
          Inhale 4s → Hold 4s → Exhale 4s → Hold 4s
        </p>
      </Card>
      <Card>
        <CardTitle>Sleep Hygiene Tips</CardTitle>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">💤</span>
            <div>
              <strong>Consistent bedtime</strong>
              <p>Go to bed and wake up at the same time every day.</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">📵</span>
            <div>
              <strong>No screens 1 hour before bed</strong>
              <p>Blue light disrupts melatonin production and delays sleep.</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🌡️</span>
            <div>
              <strong>Cool room temperature</strong>
              <p>Keeping the bedroom around 65-68°F helps support deeper sleep.</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function AlertsPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Alerts & Notifications"
        subtitle="Smart wellness alerts based on your patterns"
      />
      <div className="alert-banner alert-danger">
        <span className="alert-icon">⚠️</span>
        <div>
          <strong>Elevated stress pattern</strong>
          Stress has been high for 5 days. Consider scaling back or talking with a professional.
        </div>
      </div>
      <div className="alert-banner alert-warn">
        <span className="alert-icon">😴</span>
        <div>
          <strong>Sleep deficit detected</strong>
          You&apos;re averaging 6.2 hours this week, below your 8-hour goal.
        </div>
      </div>
      <div className="alert-banner alert-warn">
        <span className="alert-icon">💧</span>
        <div>
          <strong>Hydration reminder</strong>
          Water intake was below goal for 3 days in a row.
        </div>
      </div>
      <div className="alert-banner alert-info">
        <span className="alert-icon">📋</span>
        <div>
          <strong>Weekly assessment due</strong>
          It&apos;s been 7 days since your last check-up.
          <div style={{ marginTop: 8 }}>
            <Link className={buttonVariants({ size: "sm" })} href="/dashboard/assessment">
              Take Assessment
            </Link>
          </div>
        </div>
      </div>
      <div className="alert-banner alert-info">
        <span className="alert-icon">🌅</span>
        <div>
          <strong>Daily mood reminder</strong>
          Don&apos;t forget to log your mood today.
          <div style={{ marginTop: 8 }}>
            <Link className={buttonVariants({ size: "sm" })} href="/dashboard/mood-check-in">
              Log Mood
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page-route">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal wellness information"
      />
      <div className="profile-header-card">
        <div className="profile-avatar-lg">A</div>
        <div className="profile-header-info">
          <div className="profile-name">Alex Johnson</div>
          <div className="profile-email">demo@mindwell.app</div>
          <div className="profile-stats-row">
            <div className="profile-stat">
              <span className="pstat-val">28</span>
              <span className="pstat-lbl">Days tracked</span>
            </div>
            <div className="profile-stat">
              <span className="pstat-val">12</span>
              <span className="pstat-lbl">Assessments</span>
            </div>
            <div className="profile-stat">
              <span className="pstat-val">21</span>
              <span className="pstat-lbl">Journal entries</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-2">
        <Card>
          <CardTitle>Personal Information</CardTitle>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <Input defaultValue="Alex Johnson" />
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <Input defaultValue="28" type="number" />
          </div>
          <div className="form-group">
            <label className="form-label">Sleep Goal (hours)</label>
            <Input defaultValue="8" type="number" />
          </div>
          <button className={buttonVariants({ variant: "default", className: "full-width" })}>
            Save Changes
          </button>
        </Card>
        <Card>
          <CardTitle>Preferences</CardTitle>
          <div className="form-group">
            <label className="form-label">Daily Reminder Time</label>
            <Input defaultValue="20:00" type="time" />
          </div>
          <div className="form-group">
            <label className="form-label">Focus Area</label>
            <select className="form-input" defaultValue="Anxiety Management">
              <option>Anxiety Management</option>
              <option>Sleep Improvement</option>
              <option>Mood Stability</option>
              <option>Stress Reduction</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Theme</label>
            <select className="form-input" defaultValue="light">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button className={buttonVariants({ variant: "default", className: "full-width" })}>
            Save Preferences
          </button>
        </Card>
      </div>
    </section>
  );
}

function CrisisSupportPage() {
  return (
    <section className="page-route">
      <PageHeader
        title="Crisis Support"
        subtitle="You are not alone. Help is available right now."
      />
      <div className="emergency-card">
        <div className="emergency-icon">🆘</div>
        <h2 className="emergency-title">You Matter. Help Is Here.</h2>
        <p className="emergency-text">
          If you&apos;re experiencing a mental health crisis or thoughts of self-harm, please reach
          out immediately.
        </p>
        <div className="crisis-grid">
          <div className="crisis-item">
            <span className="crisis-icon">📞</span>
            <div>
              <strong>988 Suicide & Crisis Lifeline</strong>
              <span>Call or text 988 in the U.S.</span>
            </div>
          </div>
          <div className="crisis-item">
            <span className="crisis-icon">💬</span>
            <div>
              <strong>Crisis Text Line</strong>
              <span>Text HOME to 741741</span>
            </div>
          </div>
          <div className="crisis-item">
            <span className="crisis-icon">🌍</span>
            <div>
              <strong>International Resources</strong>
              <span>findahelpline.com</span>
            </div>
          </div>
          <div className="crisis-item">
            <span className="crisis-icon">🚨</span>
            <div>
              <strong>Emergency Services</strong>
              <span>Call 911 if you are in immediate danger</span>
            </div>
          </div>
        </div>
      </div>
      <div className="suggestion-grid" style={{ marginTop: 24 }}>
        <Link className="suggestion-card" href="/dashboard/suggestions">
          <div className="suggestion-icon">🌬️</div>
          <div className="suggestion-title">Breathe With Me</div>
          <p className="suggestion-desc">Start a guided breathing reset right now</p>
        </Link>
        <Link className="suggestion-card" href="/dashboard/journal">
          <div className="suggestion-icon">✍️</div>
          <div className="suggestion-title">Write It Out</div>
          <p className="suggestion-desc">Put your feelings somewhere safe and private</p>
        </Link>
        <Link className="suggestion-card" href="/dashboard/assessment">
          <div className="suggestion-icon">📋</div>
          <div className="suggestion-title">Take Assessment</div>
          <p className="suggestion-desc">Check in on what you&apos;re feeling right now</p>
        </Link>
      </div>
    </section>
  );
}

function SignOutPage() {
  return (
    <section className="page-route">
      <PageHeader title="Sign Out" subtitle="Your session is ready to close safely." />
      <div className="result-card">
        <div className="result-title">You&apos;re all set</div>
        <p className="result-desc">
          In the original prototype this item logged the user out. It now has its own route and can
          be wired to real auth whenever you&apos;re ready.
        </p>
        <div className="result-actions">
          <Link className={buttonVariants({ variant: "outline" })} href="/dashboard">
            Return to Dashboard
          </Link>
          <Link className="btn-next" href="/">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
