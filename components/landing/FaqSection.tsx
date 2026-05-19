'use client'

import { useState } from 'react'
import styles from '@/app/page.module.css'

const faqs = [
  {
    question: 'Is my API key secure?',
    answer:
      "Your key is stored in your browser's localStorage only. It never leaves your browser — all Anthropic API calls are made client-side, directly from your browser to Anthropic. We never see, log, or store your key on our servers. This is technically enforced, not just a policy statement.",
  },
  {
    question: 'How long does an interview take?',
    answer:
      "15–30 minutes for a typical project. Complex projects with multiple integrations take longer. The interview is designed to feel like a conversation with a senior developer, not a form. You can skip domains that don't apply to your project type.",
  },
  {
    question: 'Can I edit the generated documentation?',
    answer:
      'Yes. Every file is fully editable in-app before you export. You can also regenerate any individual file without rerunning the full interview if you change your mind about a decision.',
  },
  {
    question: 'Does this work with Claude Code, Cursor, and Windsurf?',
    answer:
      'Yes. The documentation bundle is structured markdown optimised for AI coding agent consumption. Drop the docs/ folder into your project root and point your agent at the README.md. The agent reads full architectural context before writing a line of code.',
  },
  {
    question: 'What if I already started my project?',
    answer:
      'DevDocs AI is designed for pre-build planning, but running the interview on an existing project is still useful for documenting decisions already made and identifying gaps. Several users have used it mid-project to recover from undocumented architecture.',
  },
]

export function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <section className={styles.sectionFaq} id="faq">
      <div className={styles.container}>
        <div className={styles.faqIntro}>
          <p className={styles.sectionLabel}>Common questions</p>
          <h2 className={styles.heading}>Common questions.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openFaqIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className={styles.faqArrow}>↓</span>
              </button>
              <div className={styles.faqAnswer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
