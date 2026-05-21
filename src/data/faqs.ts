export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How does the AI financial assistant work?",
    answer:
      'The assistant analyses your spending, income, and goals to surface personalised insights. Ask anything in plain English — "Where am I spending most this month?", "Can I afford this purchase?" — and it answers using your actual data, not generic advice.',
  },
  {
    question: "How do I add transactions?",
    answer:
      "Two ways: 1) Add manually for cash, one-offs, or quick entries. 2) Bulk-import a CSV (bank statement, credit card export, or another app). Expenzez auto-categorises everything and you can fine-tune at any time.",
  },
  {
    question: "Can Expenzez help me save money?",
    answer:
      "Yes — it spots forgotten subscriptions, flags categories drifting over budget, suggests realistic budget adjustments, and benchmarks your spending against UK averages so you see exactly where to trim.",
  },
  {
    question: "Does it track my credit score and credit cards?",
    answer:
      "Yes. Expenzez monitors your credit score over time, tracks balances and due dates across all your cards, and shows utilisation, payoff timelines, and total interest in one place.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Security is the top priority. All data is encrypted in transit and at rest. The app is protected with Face ID / Touch ID and an optional PIN. Your data is never sold, shared, or used to train third-party models.",
  },
  {
    question: "How does CSV import work?",
    answer:
      "Open Add transaction → Import CSV → choose your file. Expenzez auto-detects the columns (date, amount, description) and imports everything in seconds. Categories are assigned by AI and you can edit them in bulk.",
  },
  {
    question: "Will my data sync across devices?",
    answer:
      "Yes. Sign in on any new device and your transactions, budgets, goals, and insights restore automatically. You'll just need to re-enrol Face ID or your PIN on the new device for security.",
  },
  {
    question: "Is Expenzez available on Android?",
    answer:
      "Yes — Expenzez is available on both the Apple App Store and Google Play. Download on iOS or Android and your data syncs across both.",
  },
];
