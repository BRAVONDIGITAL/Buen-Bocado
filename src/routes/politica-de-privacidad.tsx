import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidad")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-bold text-primary hover:underline">← Volver a Buen Bocado</a>
        <p className="eyebrow mt-8">Información legal</p>
        <h1 className="mt-3 text-4xl font-extrabold text-primary">Política de privacidad</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última actualización: 5 de noviembre de 2026</p>
        <div className="mt-8 space-y-6 text-base leading-7 text-muted-foreground">
          <section><h2 className="text-xl font-extrabold text-primary">1. Quién está detrás de Buen Bocado</h2><p className="mt-2">Buen Bocado es el nombre comercial de este proyecto de contenido digital. Para consultas relacionadas con privacidad y datos personales, puedes escribir a <a className="font-semibold text-primary underline" href="mailto:neg.digital7@gmail.com">neg.digital7@gmail.com</a>. Los pagos y la gestión de la compra se realizan mediante la plataforma Cakto; consulta también la información de privacidad que Cakto presenta durante el proceso de compra.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">2. Qué información puede tratarse</h2><p className="mt-2">Al visitar esta página pueden tratarse datos técnicos básicos necesarios para mostrarla y proteger su funcionamiento, como información del navegador, dispositivo, dirección IP, registros de acceso y preferencias técnicas. Si decides comprar, los datos necesarios para identificar y procesar el pedido y habilitar el acceso al producto serán tratados por Cakto y los proveedores que intervengan en el pago y la entrega, conforme a sus propias políticas.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">3. Para qué se utiliza la información</h2><p className="mt-2">La información puede utilizarse para mantener y proteger el sitio, atender consultas, verificar incidencias de compra, facilitar la entrega del contenido digital y cumplir obligaciones legales aplicables. No solicitamos datos sensibles a través de esta página.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">4. Pagos y servicios de terceros</h2><p className="mt-2">Buen Bocado no recibe ni almacena directamente los datos completos de tarjetas de pago. El procesamiento del pago y los datos necesarios para la transacción se gestionan mediante Cakto y sus proveedores de pago. Los enlaces o servicios de terceros se rigen por sus propias políticas y condiciones.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">5. Cookies y tecnologías similares</h2><p className="mt-2">El sitio o los servicios que permiten su funcionamiento pueden utilizar cookies o tecnologías similares para funciones técnicas, seguridad y medición. Las herramientas de medición o publicidad solo se activarán si se configuran en el sitio. Puedes administrar las cookies desde la configuración de tu navegador; bloquearlas puede afectar algunas funciones.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">6. Conservación y seguridad</h2><p className="mt-2">La información se conserva durante el tiempo necesario para los fines descritos, atender solicitudes y cumplir obligaciones aplicables. Se adoptan medidas razonables para proteger la información, aunque ningún sistema puede garantizar seguridad absoluta.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">7. Tus consultas y derechos</h2><p className="mt-2">Según la legislación aplicable en tu lugar de residencia, puedes tener derechos de acceso, corrección, eliminación, oposición o limitación del tratamiento de tus datos. Para realizar una consulta, escribe a <a className="font-semibold text-primary underline" href="mailto:neg.digital7@gmail.com">neg.digital7@gmail.com</a>. Para datos de pago o de tu pedido, también puede ser necesario contactar directamente con Cakto.</p></section>
          <section><h2 className="text-xl font-extrabold text-primary">8. Cambios en esta política</h2><p className="mt-2">Esta política puede actualizarse para reflejar cambios en el sitio, los servicios utilizados o los requisitos aplicables. La versión vigente estará publicada en esta página.</p></section>
        </div>
        <p className="mt-10 border-t pt-5 text-sm text-muted-foreground">Contacto: <a className="font-semibold text-primary underline" href="mailto:neg.digital7@gmail.com">neg.digital7@gmail.com</a></p>
      </article>
    </main>
  );
}
