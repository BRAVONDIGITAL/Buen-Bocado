export type IngredientKind = "tomato" | "cheese" | "banana" | "oat" | "egg" | "bread" | "leaf" | "apple" | "flour";

/** Small, flat ingredient illustrations drawn with brand tokens. */
export function Ingredient({ kind, className = "h-6 w-6" }: { kind: IngredientKind; className?: string }) {
  const common = { className, viewBox: "0 0 32 32", "aria-hidden": true } as const;
  switch (kind) {
    case "tomato":
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="11" className="fill-coral" />
          <path d="M11 8c2 2 4 2 5 0 1 2 3 2 5 0-1 3-3 4-5 4s-4-1-5-4z" className="fill-primary" />
        </svg>
      );
    case "cheese":
      return (
        <svg {...common}>
          <path d="M3 22 L29 22 L29 14 L10 8 Z" className="fill-butter" />
          <circle cx="14" cy="17" r="2" className="fill-card" />
          <circle cx="22" cy="18" r="1.5" className="fill-card" />
        </svg>
      );
    case "banana":
      return (
        <svg {...common}>
          <path d="M5 10c2 12 14 17 23 10-9 2-16-3-19-11z" className="fill-butter" />
          <path d="M5 10l-1-3" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "oat":
      return (
        <svg {...common}>
          {[8, 16, 24].map((x) => (
            <ellipse key={x} cx={x} cy={x === 16 ? 12 : 18} rx="3.5" ry="6" className="fill-accent stroke-muted-foreground" strokeWidth="1" />
          ))}
        </svg>
      );
    case "egg":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="17" rx="10" ry="12" className="fill-card stroke-border" strokeWidth="1.5" />
          <circle cx="16" cy="19" r="4.5" className="fill-butter" />
        </svg>
      );
    case "bread":
      return (
        <svg {...common}>
          <path d="M6 14a10 7 0 0 1 20 0v12H6z" className="fill-accent stroke-muted-foreground" strokeWidth="1.2" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M6 26C6 12 16 5 27 5c0 12-8 21-21 21z" className="fill-primary" />
          <path d="M7 25 L22 10" className="stroke-secondary" strokeWidth="1.5" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common}>
          <circle cx="16" cy="19" r="10" className="fill-coral" />
          <path d="M16 9c0-3 2-5 5-5-1 3-3 5-5 5z" className="fill-primary" />
        </svg>
      );
    case "flour":
      return (
        <svg {...common}>
          <path d="M9 10h14l2 17H7z" className="fill-card stroke-muted-foreground" strokeWidth="1.2" />
          <path d="M11 6h10v4H11z" className="fill-secondary" />
        </svg>
      );
  }
}
