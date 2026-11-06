/**
 * Meta Pixel + Cakto checkout config.
 * META_PIXEL_ID: paste the real Pixel ID here. Empty = Pixel disabled (no script loaded).
 * Purchase is NOT fired here — it must come from Cakto's official Pixel integration.
 */
export const META_PIXEL_ID = "3832985993535186";

export const CHECKOUT = {
  basic: "https://pay.cakto.com.br/3cesfcs_1281608",
  premium: "https://pay.cakto.com.br/t36r4d9",
} as const;

export const PRICES = { basic: 9.9, premium: 14.9 } as const;

type Fbq = (...args: unknown[]) => void;

export function track(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", event, params);
}

export function goToCheckout(plan: keyof typeof CHECKOUT) {
  track("InitiateCheckout", {
    content_name: plan === "premium" ? "Buen Bocado Premium" : "Buen Bocado Básico",
    value: PRICES[plan],
    currency: "USD",
  });
}

export function pixelScript(id: string) {
  return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');`;
}
