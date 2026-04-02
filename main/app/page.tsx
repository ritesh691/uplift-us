import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>MindCare</div>
        <nav className={styles.nav}>
          <Link href="/dashboard">Log In</Link>
          <Link className={styles.ctaSmall} href="/dashboard">
            Get Started
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.circle} ${styles.circleTop}`} />
        <h1>
          Understand Your Mind,<br />
          <span>Nurture Your Wellbeing</span>
        </h1>
        <p>
          Take evidence-based mental health assessments, track your mood, and
          gain insights in a safe space.
        </p>
        <Link className={styles.cta} href="/dashboard">
          Start Your Journey
        </Link>
      </section>

      <section className={styles.features}>
        <article className={styles.card}>
          <div className={styles.icon}>🧠</div>
          <h2>Mental Health Assessment</h2>
          <p>
            Science-backed questionnaires to evaluate stress, anxiety, and
            depression levels.
          </p>
        </article>
        <article className={styles.card}>
          <div className={styles.icon}>❤️</div>
          <h2>Daily Mood Tracking</h2>
          <p>Log your moods and visualize emotional patterns over time.</p>
        </article>
        <article className={styles.card}>
          <div className={styles.icon}>🔒</div>
          <h2>Private &amp; Secure</h2>
          <p>
            Your data is encrypted and protected with industry-grade security
            measures.
          </p>
        </article>
        <article className={styles.card}>
          <div className={styles.icon}>✨</div>
          <h2>Personalized Insights</h2>
          <p>
            Get tailored suggestions and resources based on your mental health
            data.
          </p>
        </article>
      </section>

      <footer className={styles.footer}>
        © 2026 MindCare - Your mental health companion
      </footer>
    </main>
  );
}
