import type { TripBudget } from "@/lib/types/travel";

export default function BudgetPanel({ budget }: { budget: TripBudget }) {
  return (
    <section className="rounded-3xl border border-gold/25 bg-gradient-to-br from-forest-deep/8 to-gold/5 p-8 md:p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            AI Budget Studio
          </p>
          <h2 className="font-serif text-3xl text-forest-deep md:text-4xl">
            {budget.currency} {budget.total.toLocaleString()}
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted">
            {budget.perPerson.toLocaleString()} per person · {budget.tier}
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {budget.lines.map((line) => (
          <li
            key={line.label}
            className="flex items-center justify-between border-b border-forest/10 pb-4 last:border-0"
          >
            <div>
              <p className="font-medium text-charcoal">{line.label}</p>
              {line.note && (
                <p className="text-xs text-charcoal-muted">{line.note}</p>
              )}
            </div>
            <p className="font-serif text-lg text-forest-deep">
              {budget.currency} {line.amount.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm italic leading-relaxed text-charcoal-muted">
        {budget.insight}
      </p>
    </section>
  );
}
