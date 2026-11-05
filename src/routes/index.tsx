import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Check, Sparkles, CalendarDays, Shuffle, BookOpen, Coffee, Apple, Home, Users, FileText, Smartphone, Lock, Gift } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RecipeCard, type Recipe } from "@/components/pequesabor/RecipeCard";
import { CHECKOUT, goToCheckout, track } from "@/lib/tracking";

const TITLE = "Buen Bocado | 60 Recetas para Loncheras Escolares en Air Fryer";
const DESC = "Descubre 60 recetas fáciles para preparar loncheras escolares variadas con Air Fryer. Ideas dulces y saladas para los pequeños.";

/* Free-to-use Pexels photos. Creator and source pages:
   Pavel Danilyuk: https://www.pexels.com/photo/students-eating-their-snacks-8423421/
   Katerina Holmes: https://www.pexels.com/photo/cute-asian-girl-eating-tasty-organic-meal-in-plastic-container-5905694/
   Katerina Holmes: https://www.pexels.com/photo/diverse-schoolchildren-preparing-for-lunch-in-school-5905676/
   Pavel Danilyuk: https://www.pexels.com/photo/a-boy-eating-a-sandwich-from-a-lunchbox-8423428/
   Change C.C: https://www.pexels.com/photo/asian-lunch-bento-box-with-assorted-dishes-35211816/
   Manie Rehman Yousaf: https://www.pexels.com/photo/eco-friendly-double-layer-bento-lunch-box-35916884/
   Antoni Shkraba: https://www.pexels.com/photo/healthy-lunchboxes-5852270/
   Antoni Shkraba: https://www.pexels.com/photo/sliced-fruits-on-yellow-plastic-container-5852332/
   Lauren Diaz: https://www.pexels.com/photo/delicious-mini-pizzas-with-toppings-on-tray-34275219/
   Backen.de: https://www.pexels.com/photo/preparing-mini-pizza-7322629/
   alleksana: https://www.pexels.com/photo/close-up-photo-of-delicious-muffins-4051588/
   Elena Leya: https://www.pexels.com/photo/cooked-food-on-blue-ceramic-plate-9568318/ */
const FOOD_PHOTOS = {
  lunchboxes: "https://images.pexels.com/photos/8423421/pexels-photo-8423421.jpeg?auto=compress&cs=tinysrgb&w=2000",
  lunchboxDetail: "https://images.pexels.com/photos/5905694/pexels-photo-5905694.jpeg?auto=compress&cs=tinysrgb&w=2000",
  lunchboxHands: "https://images.pexels.com/photos/5905676/pexels-photo-5905676.jpeg?auto=compress&cs=tinysrgb&w=2000",
  schoolBoys: "https://images.pexels.com/photos/8423428/pexels-photo-8423428.jpeg?auto=compress&cs=tinysrgb&w=2000",
  bentoModern: "https://images.pexels.com/photos/35211816/pexels-photo-35211816.jpeg?auto=compress&cs=tinysrgb&w=2000",
  lunchboxModern: "https://images.pexels.com/photos/35916884/pexels-photo-35916884.jpeg?auto=compress&cs=tinysrgb&w=2000",
  lunchboxColorful: "https://images.pexels.com/photos/5852270/pexels-photo-5852270.jpeg?auto=compress&cs=tinysrgb&w=2000",
  lunchboxFruit: "https://images.pexels.com/photos/5852332/pexels-photo-5852332.jpeg?auto=compress&cs=tinysrgb&w=2000",
  pizza: "https://images.pexels.com/photos/34275219/pexels-photo-34275219/free-photo-of-delicious-mini-pizzas-with-toppings-on-tray.jpeg?auto=compress&dpr=1&h=1100&w=1800",
  pizzaPrep: "https://images.pexels.com/photos/7322629/pexels-photo-7322629.jpeg?auto=compress&cs=tinysrgb&w=1800",
  muffins: "https://images.pexels.com/photos/4051588/pexels-photo-4051588.jpeg?auto=compress&cs=tinysrgb&w=1800",
  cheeseSticks: "https://images.pexels.com/photos/9568318/pexels-photo-9568318.jpeg?auto=compress&cs=tinysrgb&w=1800",
} as const;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:image", content: FOOD_PHOTOS.lunchboxes },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_LA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: FOOD_PHOTOS.lunchboxes },
    ],
  }),
  component: Index,
});

/* ---------- Legal pages ---------- */
const PRIVACY_URL = "/politica-de-privacidad";
const TERMS_URL = "/terminos-y-condiciones";
const REFUND_URL = "/politica-de-reembolso";

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

function PhotoSlot({ label, src, className = "" }: { label: string; src: string; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden rounded-[1.6rem] bg-secondary shadow-card ${className}`}>
      <img
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden />
      <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-extrabold text-primary shadow-card">
        {label}
      </figcaption>
    </figure>
  );
}

/* ---------- Hero visual: real food photography ---------- */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-5">
      <div className="blob absolute -inset-5 bg-secondary" aria-hidden />
      <div className="relative aspect-[5/4] overflow-hidden rounded-[2.2rem] border-[7px] border-white bg-card shadow-soft">
        <img
          src={FOOD_PHOTOS.lunchboxes}
          alt="Niño disfrutando su almuerzo escolar con una lonchera colorida"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" aria-hidden />
        <div className="absolute bottom-5 left-5 max-w-[75%] text-white">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em]">Ideas para cada día</span>
          <p className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-3xl">Loncheras llenas de sabor</p>
        </div>
      </div>
      <div className="absolute -left-4 top-7 rounded-2xl border-4 border-white bg-card p-1.5 shadow-card md:-left-8">
        <img src={FOOD_PHOTOS.pizza} alt="Mini pizzas listas para servir" loading="lazy" className="h-24 w-28 rounded-xl object-cover md:h-28 md:w-36" />
      </div>
      <div className="absolute -bottom-1 right-2 flex items-center gap-3 rounded-2xl border border-primary/10 bg-card px-4 py-3 shadow-soft md:right-0">
        <span className="font-display text-4xl font-extrabold leading-none text-coral">60</span>
        <span className="max-w-24 text-xs font-extrabold uppercase leading-tight tracking-wide text-primary">recetas para descubrir</span>
      </div>
      <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-card sm:block">
        <img src={FOOD_PHOTOS.muffins} alt="Muffins caseros con frutos rojos" loading="lazy" className="h-28 w-24 object-cover" />
      </div>
    </div>
  );
}

/* ---------- Data ---------- */
const RECIPES: Recipe[] = [
  {
    page: 12, category: "Loncheras", image: FOOD_PHOTOS.pizza, imageAlt: "Mini pizzas recién preparadas", title: "Mini pizzas para la lonchera", prep: "15 min", temp: "180 °C", fryer: "8 min", tone: "coral",
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
    page: 24, category: "Desayunos", image: FOOD_PHOTOS.muffins, imageAlt: "Muffins caseros con frutos rojos", title: "Muffins de banana y avena", prep: "10 min", temp: "160 °C", fryer: "12 min", tone: "butter",
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
    page: 31, category: "Snacks salados", image: FOOD_PHOTOS.cheeseSticks, imageAlt: "Bastones de queso dorados con salsa", title: "Palitos de queso", prep: "12 min", temp: "190 °C", fryer: "6 min", tone: "sage",
    ingredients: [
      { kind: "cheese", text: "200 g de queso en bastones" },
      { kind: "egg", text: "1 huevo batido" },
      { kind: "flour", text: "½ taza de pan rallado" },
    ],
    steps: ["Pasa los bastones por el huevo.", "Cúbrelos con pan rallado.", "Cocina hasta dorar."],
    tip: "Congélalos 15 min antes de cocinar para que mantengan la forma.",
  },
  {
    page: 45, category: "Para compartir", image: FOOD_PHOTOS.lunchboxDetail, imageAlt: "Lonchera con sándwiches y frutas", title: "Sándwiches y bocadillos", prep: "10 min", temp: "175 °C", fryer: "5 min", tone: "butter",
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
  { n: "01", t: "Desayunos para comenzar el día", photo: FOOD_PHOTOS.muffins, alt: "Muffins recién horneados", school: false },
  { n: "02", t: "Loncheras que inspiran", photo: FOOD_PHOTOS.lunchboxHands, alt: "Compañeros preparando sus loncheras en la escuela", school: true },
  { n: "03", t: "Snacks salados para cualquier momento", photo: FOOD_PHOTOS.cheeseSticks, alt: "Bastones de queso dorados", school: true },
  { n: "04", t: "Preparaciones con mucho sabor", photo: FOOD_PHOTOS.pizza, alt: "Mini pizzas con queso y vegetales", school: true },
  { n: "05", t: "Pequeños momentos dulces", photo: FOOD_PHOTOS.schoolBoys, alt: "Dos estudiantes compartiendo una merienda", school: false },
  { n: "06", t: "Favoritos para compartir", photo: FOOD_PHOTOS.lunchboxModern, alt: "Lonchera moderna reutilizable de doble compartimento", school: false },
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
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
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
              <PhotoSlot label="Una lonchera llena de color" src={FOOD_PHOTOS.lunchboxDetail} className="col-span-2 aspect-[16/10]" />
              <PhotoSlot label="Muffins caseros" src={FOOD_PHOTOS.muffins} className="aspect-square" />
              <PhotoSlot label="Bento para el recreo" src={FOOD_PHOTOS.bentoModern} className="aspect-square" />
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
              <article key={c.n} className="group overflow-hidden rounded-[1.6rem] bg-card shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <img src={c.photo} alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {c.school && <span className="absolute left-4 top-4 rounded-full bg-butter px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary">Ideal para lonchera</span>}
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-primary">{c.n} / 06</span>
                </div>
                <div className="p-5">
                  <p className="font-display text-xs font-extrabold uppercase tracking-widest text-coral">10 recetas</p>
                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-primary">{c.t}</h3>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 6. LIFESTYLE */}
        <Section>
          <Heading eyebrow="Inspiración diaria" title="Loncheras con más color, variedad y sabor" />
          <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4">
            <PhotoSlot label="Loncheras llenas de variedad" src={FOOD_PHOTOS.lunchboxColorful} className="col-span-2 row-span-2" />
            <PhotoSlot label="Mini pizzas" src={FOOD_PHOTOS.pizza} />
            <PhotoSlot label="Muffins" src={FOOD_PHOTOS.muffins} />
            <PhotoSlot label="Preparación de mini pizzas" src={FOOD_PHOTOS.pizzaPrep} className="col-span-2" />
            <PhotoSlot label="Frutas frescas para el recreo" src={FOOD_PHOTOS.lunchboxFruit} className="col-span-2" />
            <PhotoSlot label="Bastones de queso" src={FOOD_PHOTOS.cheeseSticks} />
            <PhotoSlot label="Bento de inspiración" src={FOOD_PHOTOS.bentoModern} />
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
              image={FOOD_PHOTOS.lunchboxFruit}
              imageAlt="Lonchera con frutas frescas y sándwiches"
              price="9,90"
              plan="basic"
              cta="QUIERO EL PLAN BÁSICO."
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
              image={FOOD_PHOTOS.lunchboxModern}
              imageAlt="Lonchera moderna reutilizable de doble compartimento"
              price="14,90"
              plan="premium"
              cta="QUIERO EL PLAN PREMIUM."
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
          <div className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {[
              { i: BookOpen, t: "Fichas visuales", d: "Cada receta en su propia ficha, con foto, tiempos y temperatura." },
              { i: Sparkles, t: "Material organizado", d: "6 categorías con 10 recetas cada una, fáciles de encontrar." },
              { i: FileText, t: "Qué recibes", d: "Una guía digital en PDF con ingredientes, cantidades y pasos." },
              { i: Smartphone, t: "Acceso digital", d: "Consulta desde tu celular a través del área de miembros de Cakto." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex gap-4 border-b border-primary/10 pb-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <div>
                  <h3 className="font-extrabold text-primary">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
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
    <a href="/" className="flex items-center gap-3" aria-label="Buen Bocado, inicio">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-soft">
        <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
          <path d="M10 18.5c0-5 3.8-8.5 9-8.5h10c5.2 0 9 3.5 9 8.5v13c0 4.2-3.3 7.5-7.5 7.5h-13c-4.2 0-7.5-3.3-7.5-7.5v-13Z" fill="#FFF8ED"/>
          <path d="M10.5 20h27" stroke="#F28A70" strokeWidth="3" strokeLinecap="round"/>
          <path d="M18 26v.2M30 26v.2" stroke="#285B48" strokeWidth="3.4" strokeLinecap="round"/>
          <path d="M19.5 31c2.7 2.8 6.3 2.8 9 0" fill="none" stroke="#285B48" strokeWidth="2.4" strokeLinecap="round"/>
          <path d="M24 10c.2-4.5 3.5-7 8.2-6.8-.7 4.2-3.7 6.7-8.2 6.8Z" fill="#DDEBDD" stroke="#FFF8ED" strokeWidth="1"/>
          <path d="M24 10c-3.6-3.4-7.2-3.1-9.6-.3 2.8 2.6 6.1 2.8 9.6.3Z" fill="#F5D985" stroke="#FFF8ED" strokeWidth="1"/>
          <path d="M35 34.5c0-2.2 1.7-3.7 3.7-3.7 2 0 3.3 1.5 3.3 3.7 0 2.5-3.3 4.9-3.3 4.9s-3.7-2.4-3.7-4.9Z" fill="#F28A70" stroke="#FFF8ED" strokeWidth="1.2"/>
        </svg>
      </span>
      <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-primary">
        Buen <span className="text-coral">Bocado</span>
      </span>
    </a>
  );
}

function PlanCard({
  name, image, imageAlt, price, plan, cta, features, note, bonus, featured = false,
}: {
  name: string; image: string; imageAlt: string; price: string; plan: "basic" | "premium"; cta: string; features: string[]; note?: string; bonus?: string[]; featured?: boolean;
}) {
  return (
    <div className={`relative flex flex-col rounded-3xl bg-card p-7 ${featured ? "border-2 border-primary shadow-soft" : "border shadow-card"}`}>
      <div className="-mx-7 -mt-7 mb-6 h-36 overflow-hidden rounded-t-[1.35rem]">
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
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
