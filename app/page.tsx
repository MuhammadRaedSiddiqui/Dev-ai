import Link from 'next/link'
import { Metadata } from 'next'
import styles from './page.module.css'
import { FaqSection } from '@/components/landing/FaqSection'

export const metadata: Metadata = {
  title: 'DevDocs AI — Plan before you build',
  description:
    'Interview with AI before you code. Get a complete 10-file documentation bundle covering architecture, database, API contracts, testing, and deployment. Feed it to Claude Code, Cursor, or Windsurf.',
  keywords: [
    'AI documentation',
    'software planning',
    'technical documentation',
    'architecture documentation',
    'API documentation',
    'development planning',
    'Claude Code',
    'Cursor',
    'Windsurf',
    'pre-build planning',
  ],
  authors: [{ name: 'DevDocs AI' }],
  openGraph: {
    title: 'DevDocs AI — Plan before you build',
    description:
      'Interview with AI before you code. Get a complete 10-file documentation bundle.',
    type: 'website',
    url: 'https://devdocs.ai',
    siteName: 'DevDocs AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevDocs AI — Plan before you build',
    description:
      'Interview with AI before you code. Generate comprehensive documentation bundles.',
    creator: '@devdocsai',
  },
  alternates: {
    canonical: 'https://devdocs.ai',
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DevDocs AI',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'AI-powered pre-build planning assistant that interviews developers and generates comprehensive 10-file documentation bundles covering architecture, database, API contracts, testing, and deployment.',
    featureList: [
      'Structured Requirements Gathering',
      'Automated Documentation Synthesis',
      'AI-Powered Interview Process',
      'Export Documentation Bundles',
      'Architecture Planning',
      'Database Design Documentation',
      'API Contract Generation',
    ],
    screenshot: 'https://devdocs.ai/og-image.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>DevDocs AI</span>
        <ul className={styles.navLinks}>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#output">Output</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <div className={styles.navActions}>
          <Link href="/login" className={styles.btnGhost}>
            Sign In
          </Link>
          <Link href="/signup" className={styles.btnPrimary}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.sectionLabel}>Pre-build planning</p>
              <h1 className={styles.display}>
                Your project,
                <br />
                fully planned before
                <br />
                you write line one.
              </h1>
              <p className={styles.heroSub}>
                Interview with AI. Get a complete 10-file documentation bundle.
                Feed it to Claude Code, Cursor, or Windsurf. Build without
                guessing.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/signup" className={styles.btnPrimaryLg}>
                  Get Started Free
                </Link>
                <a href="#how" className={styles.btnGhostLg}>
                  See How It Works
                </a>
              </div>
              <p className={styles.heroNote}>
                Free with your own Anthropic API key. No subscription required.
              </p>
            </div>
            <div className={styles.fileTree}>
              <p className="treeHeader">Output bundle</p>
              <div className="dir">docs/</div>
              <div style={{ paddingLeft: '16px' }}>
                <div className="file">
                  PLANNING<span className="ext">.md</span>
                </div>
                <div className="file">
                  ARCHITECTURE<span className="ext">.md</span>
                </div>
                <div className="file">
                  DATABASE<span className="ext">.md</span>
                </div>
                <div className="file">
                  API-CONTRACTS<span className="ext">.md</span>
                </div>
                <div className="file">
                  ENV-STRATEGY<span className="ext">.md</span>
                </div>
                <div className="file">
                  AUTH<span className="ext">.md</span>
                </div>
                <div className="file">
                  TESTING<span className="ext">.md</span>
                </div>
                <div className="file">
                  MONITORING<span className="ext">.md</span>
                </div>
                <div className="file">
                  FRONTEND<span className="ext">.md</span>
                </div>
                <div className="file">
                  DEPLOYMENT<span className="ext">.md</span>
                </div>
                <div
                  className="file"
                  style={{ color: '#73726c', marginTop: '8px' }}
                >
                  README<span className="ext">.md</span>{' '}
                  <span style={{ color: '#5f5e5d', fontSize: '11px' }}>
                    ← start here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* PROBLEM */}
      <section className={styles.sectionProblem} id="problem">
        <div className={styles.container}>
          <div className={styles.problemIntro}>
            <p className={styles.sectionLabel}>The problem</p>
            <h2 className={styles.heading}>
              Watch a rough idea become a complete architecture decision record.
            </h2>
            <p>
              AI coding agents fail when planning is missing. Every
              undocumented decision — database schema, auth strategy, deployment
              target — becomes a broken build discovered mid-sprint. DevDocs AI
              surfaces every decision before development begins.
            </p>
          </div>
          <div className={styles.beforeAfter}>
            <div className={`${styles.baCard} ${styles.bad}`}>
              <p className={styles.baCardLabel}>✕ &nbsp;Without DevDocs AI</p>
              <div className={styles.codeSnippet}>
                Build me a SaaS app with user auth,
                <br />a dashboard, and Stripe payments.
              </div>
              <ul className={styles.consequenceList}>
                <li>
                  <span className="icon">✕</span>No schema — the agent guesses
                  and gets it wrong
                </li>
                <li>
                  <span className="icon">✕</span>Auth strategy undecided — JWT
                  vs sessions resolved at random
                </li>
                <li>
                  <span className="icon">✕</span>Stripe webhooks break because
                  the strategy was never defined
                </li>
                <li>
                  <span className="icon">✕</span>Three days of rework.
                  Significant token waste.
                </li>
              </ul>
            </div>
            <div className={`${styles.baCard} ${styles.good}`}>
              <p className={styles.baCardLabel}>✓ &nbsp;With DevDocs AI</p>
              <div className={styles.codeSnippet}>
                docs/README.md → 10 files loaded
                <br />
                Full architectural context present.
              </div>
              <ul className={styles.consequenceList}>
                <li>
                  <span className="icon">✓</span>Schema designed and indexed
                  before a table is created
                </li>
                <li>
                  <span className="icon">✓</span>Auth documented with provider,
                  session, and RBAC decisions
                </li>
                <li>
                  <span className="icon">✓</span>Stripe webhook strategy defined
                  in ENV-STRATEGY.md
                </li>
                <li>
                  <span className="icon">✓</span>Coding agent begins with full
                  context. No guessing.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.sectionHow} id="how">
        <div className={styles.container}>
          <div className={styles.sectionHowIntro}>
            <p className={styles.sectionLabel}>How it works</p>
            <h2 className={styles.heading}>
              Four steps between your idea
              <br />
              and a production-ready plan.
            </h2>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCell}>
              <p className={styles.stepNumber}>01 — Interview</p>
              <h4>The AI asks every question you'd skip.</h4>
              <p>
                Targeted questions across 10 planning domains. Architecture,
                database, auth, testing, deployment, and more. Every question is
                the one a senior developer would ask before writing a line of
                code.
              </p>
            </div>
            <div className={styles.stepCell}>
              <p className={styles.stepNumber}>02 — Recommend</p>
              <h4>Opinionated, not neutral.</h4>
              <p>
                Based on your constraints — team size, timeline, budget, scale —
                the AI recommends architecture with justification. It argues for
                a monolith over microservices when that's the right call. It
                thinks the way a senior developer thinks.
              </p>
            </div>
            <div className={styles.stepCell}>
              <p className={styles.stepNumber}>03 — Generate</p>
              <h4>Ten files. Every decision documented.</h4>
              <p>
                All 10 documentation files generated simultaneously. Each
                follows a strict markdown format optimised for AI coding agent
                consumption. Edit any file in-app before exporting — regenerate
                single sections without rerunning the full interview.
              </p>
            </div>
            <div className={styles.stepCell}>
              <p className={styles.stepNumber}>04 — Export &amp; Build</p>
              <h4>Drop in. Point. Build.</h4>
              <p>
                Download the complete documentation bundle as a ZIP. Drop the
                docs/ folder into your project root. Point your coding agent at
                README.md and start building with full architectural context
                already loaded.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* OUTPUT */}
      <section className={styles.sectionOutput} id="output">
        <div className={styles.container}>
          <div className={styles.outputIntro}>
            <p className={styles.sectionLabel}>The output</p>
            <h2 className={styles.heading}>
              Ten files. Nothing left
              <br />
              for the agent to guess.
            </h2>
          </div>
          <div className={styles.outputTable}>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                PLANNING<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Project scope, MVP definition, success metrics, timeline
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                ARCHITECTURE<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Tech stack decisions, architecture decision records, component
                responsibilities
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                DATABASE<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Schema design, migration strategy, indexing plan, soft delete
                policy
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                API-CONTRACTS<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Endpoint definitions, request/response shapes, authentication
                per route
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                ENV-STRATEGY<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Environment list, secrets management, CI/CD gate definitions
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                AUTH<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Auth provider, session strategy, token storage, RBAC model
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                TESTING<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Testing pyramid, tool choices, coverage targets, CI integration
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                MONITORING<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Four golden signals, alert thresholds, error tracking, health
                checks
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                FRONTEND<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Design tokens, component architecture, state management pattern,
                a11y targets
              </div>
            </div>
            <div className={styles.outputRow}>
              <div className={styles.outputFilename}>
                DEPLOYMENT<span className="ext">.md</span>
              </div>
              <div className={styles.outputDesc}>
                Hosting platform, deployment method, rollback strategy, scaling
                triggers
              </div>
            </div>
          </div>
          <p className={styles.outputNote}>
            Every file is editable in-app before export. Regenerate any section
            without rerunning the full interview.
          </p>
        </div>
      </section>

      {/* BYOK */}
      <section className={styles.sectionByok} id="byok">
        <div className={styles.container}>
          <div className={styles.byokIntro}>
            <p className={styles.sectionLabel}>How billing works</p>
            <h2 className={styles.heading}>
              Bring your own key.
              <br />
              Pay nothing to us. Build everything.
            </h2>
          </div>
          <div className={styles.byokCols}>
            <div className={styles.byokCol}>
              <p className={styles.byokPrice}>$0 / free</p>
              <h4>Free with BYOK</h4>
              <p>
                You supply your Anthropic API key. All AI calls go directly from
                your browser to the Anthropic API. Your key never touches our
                servers. Typical session costs $0.50–$1.00 in API usage.
              </p>
            </div>
            <div className={styles.byokCol}>
              <p className={styles.byokPrice}>$12 / month</p>
              <h4>Pro — hosted key</h4>
              <p>
                We manage the API key. No Anthropic account required. Unlimited
                projects, PDF export, project versioning, and email support.
                Upgrade when your BYOK spend exceeds $12/month.
              </p>
            </div>
            <div className={styles.byokCol}>
              <p className={styles.byokPrice}>$35 / seat / month</p>
              <h4>Team — shared workspaces</h4>
              <p>
                Everything in Pro. Shared team workspaces, role-based
                permissions, admin dashboard, SSO, and audit logs. For small
                teams building together.
              </p>
            </div>
          </div>
          <p className={styles.byokNote}>
            The free tier is complete. All 10 documentation domains. All
            templates. ZIP export. No feature gates.
          </p>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* PRICING */}
      <section className={styles.sectionPricing} id="pricing">
        <div className={styles.container}>
          <div className={styles.pricingIntro}>
            <p className={styles.sectionLabel}>Pricing</p>
            <h2 className={styles.heading}>Simple pricing.</h2>
          </div>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <p className={styles.pricingTier}>Free</p>
              <p className={styles.pricingPrice}>$0</p>
              <p className={styles.pricingPriceNote}>forever</p>
              <p className={styles.pricingDesc}>
                For developers validating the approach. Full product, your own
                API key.
              </p>
              <ul className={styles.pricingFeatures}>
                <li>3 projects</li>
                <li>All 10 documentation domains</li>
                <li>All project templates</li>
                <li>ZIP export</li>
                <li>Share links</li>
                <li>BYOK only</li>
              </ul>
              <Link href="/signup" className={styles.btnGhostLg}>
                Get Started Free
              </Link>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <span className={styles.featuredBadge}>Most popular</span>
              <p className={styles.pricingTier}>Pro</p>
              <p className={styles.pricingPrice}>$12</p>
              <p className={styles.pricingPriceNote}>per month</p>
              <p className={styles.pricingDesc}>
                For developers who build regularly and want zero API key
                friction.
              </p>
              <ul className={styles.pricingFeatures}>
                <li>Unlimited projects</li>
                <li>Hosted API key — no BYOK</li>
                <li>Project versioning</li>
                <li>PDF export</li>
                <li>Priority processing</li>
                <li>Email support</li>
              </ul>
              <Link href="/signup" className={styles.btnPrimaryLg}>
                Start Pro
              </Link>
            </div>

            <div className={styles.pricingCard}>
              <p className={styles.pricingTier}>Team</p>
              <p className={styles.pricingPrice}>$35</p>
              <p className={styles.pricingPriceNote}>per seat / month</p>
              <p className={styles.pricingDesc}>
                For small teams building and documenting together.
              </p>
              <ul className={styles.pricingFeatures}>
                <li>Everything in Pro</li>
                <li>Team workspaces</li>
                <li>Shared projects</li>
                <li>Admin dashboard</li>
                <li>SSO + audit logs</li>
                <li>Dedicated support</li>
              </ul>
              <a href="#" className={styles.btnGhostLg}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* FINAL CTA */}
      <section className={styles.sectionCta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2 className={styles.display}>
              Stop discovering architecture decisions mid-build.
            </h2>
            <p className="sub">
              Plan completely. Build confidently. Ship without rework.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/signup" className={styles.btnPrimaryLg}>
                Get Started Free
              </Link>
              <a href="#output" className={styles.btnGhostLg}>
                See the Output
              </a>
            </div>
            <p className={styles.ctaNote}>
              Free with your Anthropic API key. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeft}>
              <span className={styles.footerWordmark}>DevDocs AI</span>
              <span className={styles.footerCopy}>
                © 2026 DevDocs AI. All rights reserved.
              </span>
            </div>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#how">How It Works</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Twitter / X</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
