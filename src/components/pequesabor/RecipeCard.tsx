import { Clock, Thermometer, Timer, Lightbulb } from "lucide-react";
import { Ingredient, type IngredientKind } from "./Ingredient";

export type Recipe = {
  page: number;
  category: string;
  title: string;
  prep: string;
  temp: string;
  fryer: string;
  ingredients: { kind: IngredientKind; text: string }[];
  steps: string[];
  tip: string;
  tone: "sage" | "butter" | "coral";
};

const toneBg = {
  sage: "bg-secondary",
  butter: "bg-accent/60",
  coral: "bg-coral/25",
} as const;

export function RecipeCard({ r }: { r: Recipe }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className={`relative aspect-[16/10] ${toneBg[r.tone]} flex items-center justify-center`}>
        <div className="flex gap-2 opacity-90">
          {r.ingredients.slice(0, 3).map((i, k) => (
            <Ingredient key={k} kind={i.kind} className="h-12 w-12 md:h-14 md:w-14" />
          ))}
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          {r.category}
        </span>
        <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-primary/70">
          Espacio para fotografía del plato
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold leading-tight text-primary">{r.title}</h3>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Clock, label: "Preparación", v: r.prep },
            { icon: Thermometer, label: "Temperatura", v: r.temp },
            { icon: Timer, label: "Air Fryer", v: r.fryer },
          ].map(({ icon: Icon, label, v }) => (
            <div key={label} className="rounded-xl bg-muted px-1 py-2">
              <Icon className="mx-auto h-4 w-4 text-coral" aria-hidden />
              <dt className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</dt>
              <dd className="text-sm font-bold text-primary">{v}</dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-5 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Ingredientes</h4>
        <ul className="mt-2 space-y-1.5">
          {r.ingredients.map((i) => (
            <li key={i.text} className="flex items-center gap-2 text-sm">
              <Ingredient kind={i.kind} className="h-5 w-5 shrink-0" />
              {i.text}
            </li>
          ))}
        </ul>

        <h4 className="mt-5 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Preparación</h4>
        <ol className="mt-2 space-y-2">
          {r.steps.map((s, k) => (
            <li key={k} className="flex gap-3 text-sm leading-snug">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {k + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-auto pt-5">
          <div className="flex gap-2 rounded-xl bg-accent/45 p-3 text-sm">
            <Lightbulb className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <p>
              <strong className="text-primary">Tip Buen Bocado:</strong> {r.tip}
            </p>
          </div>
          <p className="mt-3 text-right text-[10px] font-semibold text-muted-foreground">Buen Bocado · pág. {r.page}</p>
        </div>
      </div>
    </article>
  );
}
