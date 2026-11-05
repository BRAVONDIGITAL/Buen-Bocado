import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Check, Sparkles, CalendarDays, Shuffle, BookOpen, Coffee, Apple, Home, Users, FileText, Smartphone, Lock, Camera, MessageSquareQuote, Gift } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RecipeCard, type Recipe } from "@/components/pequesabor/RecipeCard";
import { Ingredient, type IngredientKind } from "@/components/pequesabor/Ingredient";
import { CHECKOUT, goToCheckout, track } from "@/lib/tracking";

const TITLE = "Buen Bocado | 60 Recetas para Loncheras Escolares en Air Fryer";
const DESC = "Descubre 60 recetas fáciles para preparar loncheras escolares variadas con Air Fryer. Ideas dulces y saladas para los pequeños.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_LA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

/* ---------- Editable footer fields ---------- */
const PRIVACY_URL = "#"; // TODO
const TERMS_URL = "#"; // TODO
const REFUND_URL = "#"; // TODO: política de reembolso configurada en Cakto

/* ---------- Shared UI ---------- */
function CtaToPlans({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "coral" }) {
  const cls =
    variant === "coral"
      ? "bg-coral text-coral-foreground hover:brightness-95"
      : "bg-primary text-primary-foreground hover:brightness-110";
  return (
    <a
      href="#planes"
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-full px-7 py-4 text-center font-display text-base font-extrabold uppercase tracking-wide shadow-soft transition sm:w-auto ${cls}`}
    >
      {children}
    </a>
  );
}

function Section({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`px-5 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, children, center = true }: { eyebrow?: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] text-primary md:text-5xl">{title}</h2>
      {children && <div className="mt-5 space-y-3 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}

function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <figure className={`photo-slot relative flex items-end overflow-hidden rounded-2xl ${className}`}>
      <figcaption className="m-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary">
        <Camera className="h-3.5 w-3.5" aria-hidden /> {label}
      </figcaption>
    </figure>
  );
}

/* ---------- Hero visual: lunchbox + cover (pure CSS) ---------- */
function Compartment({ kinds, label, className = "" }: { kinds: IngredientKind[]; label: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 ${className}`}>
      <div className="flex -space-x-2">
        {kinds.map((k, i) => (
          <Ingredient key={i} kind={k} className="h-9 w-9 md:h-11 md:w-11" />
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">{label}</span>
    </div>
  );
}

function Cover({ className = "" }: { className?: string }) {
  return (
    <div className={`flex aspect-[3/4] flex-col justify-between rounded-r-xl rounded-l-sm bg-primary p-4 text-primary-foreground shadow-soft ring-1 ring-primary/30 ${className}`}>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Buen Bocado</div>
      <div>
        <div className="font-display text-4xl font-extrabold leading-none text-butter">60</div>
        <div className="mt-1 font-display text-sm font-extrabold leading-tight">Recetas Fáciles para Niños en Air Fryer</div>
      </div>
      <div className="flex gap-1">
        <Ingredient kind="apple" className="h-5 w-5" />
        <Ingredient kind="cheese" className="h-5 w-5" />
        <Ingredient kind="leaf" className="h-5 w-5" />
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="blob absolute -inset-6 bg-secondary" aria-hidden />
      <div className="relative rounded-[2rem] border-4 border-primary/15 bg-card p-3 shadow-soft">
        <div className="grid grid-cols-3 grid-rows-2 gap-2" style={{ aspectRatio: "4 / 3" }}>
          <Compartment kinds={["tomato", "cheese"]} label="Mini pizzas" className="col-span-2 bg-coral/20" />
          <Compartment kinds={["apple"]} label="Frutas" className="bg-secondary" />
          <Compartment kinds={["banana", "oat"]} label="Muffins" className="bg-accent/50" />
          <Compartment kinds={["bread", "leaf"]} label="Sándwich" className="col-span-2 bg-muted" />
        </div>
      </div>
      <Cover className="absolute -bottom-10 -right-2 w-32 rotate-6 md:w-40" />
      <div className="absolute -left-3 -top-4 rounded-full bg-butter px-4 py-2 font-display text-sm font-extrabold text-primary shadow-card">
        60 recetas
      </div>
    </div>
  );
}

/* ---------- Data ---------- */
const RECIPES: Recipe[] = [
  {
    page: 12, category: "Loncheras", title: "Mini pizzas para la lonchera", prep: "15 min", temp: "180 °C", fryer: "8 min", tone: "coral",
    ingredients: [
      { kind: "bread", text: "4 panes pequeños o masa base" },
      { kind: "tomato", text: "4 cdas. de salsa de tomate" },
      { kind: "cheese", text: "1 taza de queso rallado" },
      { kind: "leaf", text: "Orégano al gusto" },
    ],
    steps: ["Cubre cada base con salsa.", "Agrega el queso y el orégano.", "Cocina en la Air Fryer hasta gratinar."],
    tip: "Déjalas enfriar antes de guardarlas para que no se humedezcan.",
  },
  {
    page: 24, category: "Desayunos", title: "Muffins de banana y avena", prep: "10 min", temp: "160 °C", fryer: "12 min", tone: "butter",
    ingredients: [
      { kind: "banana", text: "2 bananas maduras" },
      { kind: "oat", text: "1 taza de avena" },
      { kind: "egg", text: "2 huevos" },
      { kind: "flour", text: "1 cdta. de polvo de hornear" },
    ],
    steps: ["Tritura las bananas.", "Mezcla con los demás ingredientes.", "Distribuye en moldes y cocina."],
    tip: "Usa moldes de silicona para desmoldar con facilidad.",
  },
  {
    page: 31, category: "Snacks salados", title: "Palitos de queso", prep: "12 min", temp: "190 °C", fryer: "6 min", tone: "sage",
    ingredients: [
      { kind: "cheese", text: "200 g de queso en bastones" },
      { kind: "egg", text: "1 huevo batido" },
      { kind: "flour", text: "½ taza de pan rallado" },
    ],
    steps: ["Pasa los bastones por el huevo.", "Cúbrelos con pan rallado.", "Cocina hasta dorar."],
    tip: "Congélalos 15 min antes de cocinar para que mantengan la forma.",
  },
  {
    page: 45, category: "Para compartir", title: "Sándwiches y bocadillos", prep: "10 min", temp: "175 °C", fryer: "5 min", tone: "butter",
    ingredients: [
      { kind: "bread", text: "4 rebanadas de pan" },
      { kind: "cheese", text: "4 lonchas de queso" },
      { kind: "leaf", text: "Hojas verdes opcionales" },
    ],
    steps: ["Arma los sándwiches.", "Tuéstalos en la Air Fryer.", "Corta en formas divertidas."],
    tip: "Envuélvelos en papel encerado para que lleguen crujientes.",
  },
];

const CATEGORIES = [
  { n: "01", t: "Desayunos para comenzar el día", k: ["banana", "oat"] as IngredientKind[], school: false },
  { n: "02", t: "Loncheras que inspiran", k: ["apple", "bread"] as IngredientKind[], school: true },
  { n: "03", t: "Snacks salados para cualquier momento", k: ["cheese", "tomato"] as IngredientKind[], school: true },
  { n: "04", t: "Recetas con queso, pollo y mucho sabor", k: ["cheese", "leaf"] as IngredientKind[], school: true },
  { n: "05", t: "Pequeños momentos dulces", k: ["banana", "apple"] as IngredientKind[], school: false },
  { n: "06", t: "Favoritos para compartir", k: ["bread", "egg"] as IngredientKind[], school: false },
];

const FAQ = [
  ["¿Qué es Buen Bocado?", "Buen Bocado es una guía digital con 60 recetas para preparar en Air Fryer, especialmente pensada para ayudarte a encontrar nuevas ideas para las loncheras escolares."],
  ["¿Qué incluye el producto?", "Incluye 60 recetas con ingredientes, cantidades, instrucciones y orientaciones de preparación. El Plan Premium suma además dos materiales extra: “15 Snacks para Niños con Paladar Selectivo” y la “Guía de Cambios y Sustituciones”."],
  ["¿Las recetas son solo para la escuela?", "No. Aunque la guía está enfocada en las loncheras escolares, también encontrarás ideas que puedes aprovechar para desayunos y meriendas en casa."],
  ["¿Necesito una Air Fryer?", "Sí. Las recetas están diseñadas para prepararse utilizando una Air Fryer."],
  ["¿Cómo recibiré el producto?", "Después de la confirmación del pago, recibirás las instrucciones para acceder al contenido a través de la plataforma de Cakto."],
  ["¿Puedo consultarlo desde mi celular?", "Sí. Puedes acceder al material desde dispositivos compatibles, como celulares, tablets y computadoras."],
  ["¿Cuál es la diferencia entre los planes?", "El Plan Premium incluye todo el contenido del Básico, acceso ilimitado, futuras actualizaciones cuando estén disponibles y los dos materiales extra. El Plan Básico tiene el período de acceso indicado en las condiciones de compra."],
  ["¿Las recetas garantizan resultados nutricionales?", "No. Buen Bocado es una guía de ideas culinarias y no sustituye la orientación individual de profesionales de salud o nutrición."],
];

/* ---------- Page ---------- */
function Index() {
  useEffect(() => {
    track("ViewContent", { content_name: "Buen Bocado - 60 Recetas Air Fryer" });
  }, []);

  return (
    <div className="font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Logo />
          <a href="#planes" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            Ver planes
          </a>
        </div>
      </header>

      <main>
        {/* 1. HERO */}
        <section className="bg-hero overflow-hidden px-5 pb-24 pt-10 md:pb-28 md:pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">Ideas para loncheras escolares</p>
              <h1 className="mt-3 text-[2.4rem] font-extrabold leading-[1.02] text-primary sm:text-5xl md:text-6xl">
                ¿Otra vez sin ideas para la lonchera escolar?
              </h1>
              <p className="mt-5 font-display text-xl font-bold text-foreground md:text-2xl">
                ¡Sorprende a los pequeños con nuevas opciones cada día!
              </p>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Descubre 60 recetas fáciles y deliciosas para preparar en Air Fryer y deja atrás la rutina de repetir siempre los mismos bocadillos en la lonchera de tus hijos.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["60 recetas", "Ideas para loncheras escolares", "Preparaciones en Air Fryer"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-primary">
                    <Check className="h-4 w-4 text-coral" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-start gap-3">
                <CtaToPlans>¡Quiero nuevas ideas para la lonchera!</CtaToPlans>
                <p className="text-sm text-muted-foreground">
                  A partir de <strong className="font-display text-lg text-primary">US$ 9,90</strong> · Producto digital en PDF
                </p>
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* 2. DOR */}
        <Section>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              <PhotoSlot label="Familia preparando la lonchera" className="col-span-2 aspect-[16/10]" />
              <PhotoSlot label="Opciones de bocadillos" className="aspect-square" />
              <PhotoSlot label="Lonchera lista" className="aspect-square" />
            </div>
            <div>
              <Heading center={false} eyebrow="La rutina de cada mañana" title="¿Qué poner hoy en la lonchera?">
                <p>Cada mañana llega el mismo desafío.</p>
                <p>Pensar qué preparar, buscar nuevas ideas y evitar que los pequeños lleven siempre los mismos bocadillos a la escuela.</p>
                <p>A veces parece que las opciones se terminan y la creatividad también.</p>
                <p className="font-semibold text-foreground">
                  Por eso creamos Buen Bocado: una colección de 60 recetas para ayudarte a encontrar nuevas ideas y darle más variedad a las loncheras escolares.
                </p>
              </Heading>
            </div>
          </div>
        </Section>

        {/* 3. SOLUÇÃO */}
        <Section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">La solución</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">¡Dile adiós a la falta de ideas para la lonchera!</h2>
            <p className="mt-5 text-lg leading-relaxed opacity-90">
              Con Buen Bocado tendrás una colección organizada de 60 recetas para descubrir nuevas preparaciones y variar las opciones que acompañan a los pequeños en la escuela. Ideas dulces, saladas y prácticas para preparar con tu Air Fryer.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { i: CalendarDays, t: "Más ideas para cada día", d: "Encuentra nuevas opciones para salir de la rutina de repetir siempre los mismos bocadillos." },
              { i: Shuffle, t: "Loncheras más variadas", d: "Descubre diferentes combinaciones de preparaciones dulces y saladas." },
              { i: BookOpen, t: "Todo organizado en un solo lugar", d: "Consulta las recetas con ingredientes, cantidades e instrucciones paso a paso." },
            ].map(({ i: Icon, t, d }, k) => (
              <div key={t} className="rounded-2xl bg-card p-6 text-card-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-accent">0{k + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold uppercase text-primary">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. POR DENTRO */}
        <Section id="por-dentro">
          <Heading eyebrow="Así es por dentro" title="¡Mira lo que encontrarás dentro de Buen Bocado!">
            <p>No recibirás una simple lista de ideas.</p>
            <p>Tendrás una guía digital organizada, con recetas presentadas de forma visual, ingredientes, cantidades y preparación paso a paso.</p>
            <p>Cada ficha está pensada para que encuentres fácilmente lo que necesitas y puedas elegir nuevas opciones para las loncheras escolares.</p>
          </Heading>
          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {RECIPES.map((r) => (
              <div key={r.title} className="w-[85%] shrink-0 snap-center md:w-auto">
                <RecipeCard r={r} />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-muted-foreground">
            Vistas ilustrativas del formato del producto. El diseño final de las páginas puede variar.
          </p>
        </Section>

        {/* 5. 60 RECEITAS */}
        <Section className="bg-secondary">
          <Heading eyebrow="6 categorías · 10 recetas cada una" title="60 recetas para renovar las loncheras escolares." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.n} className="relative flex items-center gap-4 rounded-2xl bg-card p-5 shadow-card">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted">
                  <Ingredient kind={c.k[0] ?? "apple"} className="h-9 w-9" />
                </div>
                <div>
                  <p className="font-display text-sm font-extrabold text-coral">{c.n} · 10 recetas</p>
                  <h3 className="text-lg font-extrabold uppercase leading-tight text-primary">{c.t}</h3>
                </div>
                {c.school && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Ideal lonchera
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 6. LIFESTYLE */}
        <Section>
          <Heading eyebrow="Inspiración diaria" title="Loncheras con más color, variedad y sabor" />
          <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4">
            <PhotoSlot label="Madre organizando la lonchera" className="col-span-2 row-span-2" />
            <PhotoSlot label="Mini pizzas" />
            <PhotoSlot label="Muffins" />
            <PhotoSlot label="Padre armando la lonchera" className="col-span-2" />
            <PhotoSlot label="Niños con su lonchera" className="col-span-2" />
            <PhotoSlot label="Palitos de queso" />
            <PhotoSlot label="Recipientes coloridos" />
          </div>
        </Section>

        {/* 7. MOMENTOS */}
        <Section className="bg-muted">
          <Heading eyebrow="Y además…" title="Más ideas para disfrutar en diferentes momentos.">
            <p>Aunque Buen Bocado está pensada para ayudarte con las loncheras escolares, sus recetas también pueden inspirarte para otros momentos del día.</p>
          </Heading>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { i: Coffee, t: "Desayunos" },
              { i: Apple, t: "Meriendas" },
              { i: Home, t: "Snacks en casa" },
              { i: Users, t: "Momentos para compartir en familia" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="rounded-2xl bg-card p-5 text-center">
                <Icon className="mx-auto h-7 w-7 text-coral" aria-hidden />
                <p className="mt-3 font-display font-extrabold text-primary">{t}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. PARA QUIÉN */}
        <Section>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Heading center={false} eyebrow="¿Para quién es?" title="Una guía pensada para la rutina de las familias." />
            <ul className="space-y-3">
              {[
                "Madres que buscan nuevas ideas para las loncheras escolares.",
                "Padres y cuidadores que desean variar los bocadillos de los pequeños.",
                "Familias que quieren descubrir nuevas preparaciones con Air Fryer.",
                "Personas que necesitan inspiración para organizar las meriendas.",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl border bg-card p-4 text-lg">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Check className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* 9. PLANES */}
        <Section id="planes" className="bg-hero scroll-mt-14">
          <Heading eyebrow="Acceso inmediato tras el pago" title="¡Elige tu plan Buen Bocado!" />
          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            <PlanCard
              name="Plan Básico"
              price="9,90"
              plan="basic"
              cta="Quiero el plan básico"
              features={[
                "60 recetas para Air Fryer.",
                "Ideas para loncheras escolares.",
                "Opciones dulces y saladas.",
                "Ingredientes y cantidades.",
                "Preparación paso a paso.",
                "Temperaturas y tiempos orientativos.",
              ]}
              note="Acceso según el período indicado en las condiciones de compra de Cakto."
            />
            <PlanCard
              featured
              name="Plan Premium"
              price="14,90"
              plan="premium"
              cta="Quiero el plan premium"
              features={[
                "Todo lo incluido en el Plan Básico.",
                "Acceso ilimitado al material adquirido.",
                "Actualizaciones futuras cuando estén disponibles.",
              ]}
              bonus={["15 Snacks para Niños con Paladar Selectivo", "Guía de Cambios y Sustituciones"]}
            />
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden /> Producto digital en PDF</span>
            <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4" aria-hidden /> Pago procesado por Cakto</span>
            <span className="inline-flex items-center gap-1.5"><Smartphone className="h-4 w-4" aria-hidden /> Celular, tablet y computadora</span>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-muted-foreground">
            El material se entrega en el área de miembros de Cakto después de la confirmación del pago. Los medios de pago disponibles dependen de tu país.
          </p>
        </Section>

        {/* 10. CONFIANZA */}
        <Section>
          <Heading eyebrow="Compra con claridad" title="Conoce lo que estás a punto de descubrir." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: BookOpen, t: "Fichas visuales", d: "Cada receta en su propia ficha, con foto, tiempos y temperatura." },
              { i: Sparkles, t: "Material organizado", d: "6 categorías con 10 recetas cada una, fáciles de encontrar." },
              { i: FileText, t: "Qué recibes", d: "Una guía digital en PDF con ingredientes, cantidades y pasos." },
              { i: Smartphone, t: "Acceso digital", d: "Consulta desde tu celular a través del área de miembros de Cakto." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-5">
                <Icon className="h-6 w-6 text-coral" aria-hidden />
                <h3 className="mt-3 font-extrabold text-primary">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center text-muted-foreground">
            <MessageSquareQuote className="h-8 w-8" aria-hidden />
            <p className="font-display font-bold">Pronto compartiremos aquí experiencias reales de familias que usan Buen Bocado.</p>
            <a href="#por-dentro" className="text-sm font-bold text-primary underline underline-offset-4">Ver las fichas por dentro</a>
          </div>
        </Section>

        {/* 11. FAQ */}
        <Section className="bg-secondary">
          <Heading eyebrow="Preguntas frecuentes" title="¿Tienes alguna duda?" />
          <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl space-y-3">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border-none bg-card px-5">
                <AccordionTrigger className="text-left font-display text-base font-extrabold text-primary hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        {/* 12. CTA FINAL */}
        <Section className="bg-primary text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">¡Que la lonchera deje de ser un desafío cada mañana!</h2>
            <p className="mt-5 text-lg opacity-90">
              Descubre 60 nuevas ideas para preparar, combinar y variar los bocadillos escolares de los pequeños. Con Buen Bocado tendrás inspiración para salir de la rutina y encontrar nuevas opciones con tu Air Fryer.
            </p>
            <div className="mt-8"><CtaToPlans variant="coral">¡Quiero Buen Bocado!</CtaToPlans></div>
          </div>
        </Section>
      </main>

      {/* 13. FOOTER */}
      <footer className="border-t bg-background px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">Producto digital · 60 Recetas Fáciles para Niños en Air Fryer</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary" aria-label="Legal">
            <a href={PRIVACY_URL}>Política de privacidad</a>
            <a href={TERMS_URL}>Términos y condiciones</a>
            <a href={REFUND_URL}>Política de reembolso</a>
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Buen Bocado. Todos los derechos reservados. Este producto no sustituye la orientación de profesionales de salud o nutrición.
        </p>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2" aria-label="Buen Bocado inicio">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
        <Ingredient kind="apple" className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-extrabold text-primary">
        Peque<span className="text-coral">Sabor</span>
      </span>
    </a>
  );
}

function PlanCard({
  name, price, plan, cta, features, note, bonus, featured = false,
}: {
  name: string; price: string; plan: "basic" | "premium"; cta: string; features: string[]; note?: string; bonus?: string[]; featured?: boolean;
}) {
  return (
    <div className={`relative flex flex-col rounded-3xl bg-card p-7 ${featured ? "border-2 border-primary shadow-soft" : "border shadow-card"}`}>
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-coral-foreground">
          Más completo
        </span>
      )}
      <h3 className="text-xl font-extrabold uppercase text-primary">{name}</h3>
      <p className="mt-3 flex items-baseline gap-1 text-primary">
        <span className="font-display text-lg font-bold">US$</span>
        <span className="font-display text-5xl font-extrabold">{price}</span>
      </p>
      <p className="text-sm text-muted-foreground">Pago único · PDF digital</p>
      <ul className="mt-6 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /> {f}
          </li>
        ))}
      </ul>
      {bonus && (
        <div className="mt-5 rounded-2xl bg-accent/45 p-4">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <Gift className="h-4 w-4" aria-hidden /> Incluido en Premium
          </p>
          <ul className="mt-2 space-y-1.5 text-sm font-semibold">
            {bonus.map((b) => (
              <li key={b} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-coral" aria-hidden /> {b}</li>
            ))}
          </ul>
        </div>
      )}
      {note && <p className="mt-5 text-xs text-muted-foreground">{note}</p>}
      <a
        href={CHECKOUT[plan]}
        onClick={() => goToCheckout(plan)}
        rel="noopener"
        className={`mt-auto inline-flex min-h-14 items-center justify-center rounded-full px-6 py-4 text-center font-display font-extrabold uppercase tracking-wide transition ${
          featured ? "bg-primary text-primary-foreground hover:brightness-110" : "bg-secondary text-primary hover:bg-accent"
        } ${note ? "mt-6" : "mt-8"}`}
      >
        {cta}
      </a>
    </div>
  );
}
