import { Clock, Thermometer, Timer, Lightbulb } from "lucide-react";
import { Ingredient, type IngredientKind } from "./Ingredient";

export type Recipe = {
  page: number;
  category: string;
  image: string;
  imageAlt: string;
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
    <article className="recipe-card flex h-full flex-col overflow-hidden rounded-[1.8rem] border-2 border-white bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className={`group relative aspect-[16/10] overflow-hidden ${toneBg[r.tone]}`}>
        <span className="absolute right-3 top-3 z-10 rounded-full border-2 border-white bg-background/95 px-2.5 py-1 text-base shadow-card" aria-hidden="true">😋</span>
        <img
          src={r.image}
          alt={r.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden />
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary shadow-card">
          {r.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
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
