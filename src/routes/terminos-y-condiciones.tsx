import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terminos-y-condiciones")({
  component: TermsAndConditions,
});

function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-bold text-primary hover:underline">
          ← Volver a Buen Bocado
        </a>
        <p className="eyebrow mt-8">Información legal</p>
        <h1 className="mt-3 text-4xl font-extrabold text-primary">Términos y condiciones</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: 5 de noviembre de 2026
        </p>
        <div className="mt-8 space-y-6 text-base leading-7 text-muted-foreground">
          <section>
            <h2 className="text-xl font-extrabold text-primary">1. Identificación del producto</h2>
            <p className="mt-2">
              Buen Bocado es un producto digital que ofrece una guía en PDF con 60 recetas para
              preparar en Air Fryer, enfocadas principalmente en loncheras escolares y meriendas. El
              el soporte al comprador se gestiona a través de los canales indicados por Cakto en el
              proceso de compra. La compra se procesa mediante Cakto; antes de pagar, revisa los
              datos del vendedor, el precio final y las condiciones que se muestran en el checkout.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">2. Compra y pago</h2>
            <p className="mt-2">
              Los precios y los medios de pago disponibles son los que se muestran en el checkout de
              Cakto al momento de la compra. La operación se considera confirmada cuando la
              plataforma o el proveedor de pago confirma la transacción. Cualquier impuesto,
              conversión de moneda o cargo aplicable debe revisarse en el resumen presentado antes
              de finalizar el pedido.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">3. Entrega y acceso</h2>
            <p className="mt-2">
              El producto es digital y no se envía ningún artículo físico. Tras la confirmación del
              pago, Cakto proporciona las instrucciones o el acceso al contenido mediante su área de
              miembros u otro mecanismo informado en el checkout. El acceso del Plan Básico está
              sujeto al período indicado en las condiciones de compra. El Plan Premium incluye
              acceso ilimitado al material adquirido y los dos extras anunciados: “15 Snacks para
              Niños con Paladar Selectivo” y “Guía de Cambios y Sustituciones”.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">4. Uso permitido</h2>
            <p className="mt-2">
              La compra concede acceso para uso personal. No está permitido revender, redistribuir,
              publicar, compartir masivamente ni comercializar el PDF o sus materiales, total o
              parcialmente, sin autorización previa por escrito. La compra no transfiere la
              propiedad intelectual del contenido.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">5. Naturaleza del contenido</h2>
            <p className="mt-2">
              Las recetas y orientaciones son material informativo y culinario. Los tiempos y
              temperaturas pueden variar según el modelo de Air Fryer, los ingredientes y el tamaño
              de las porciones. El contenido no constituye asesoramiento médico, nutricional ni una
              garantía de resultados de salud. Considera alergias, intolerancias, edad y necesidades
              individuales, y consulta a un profesional cuando corresponda.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">6. Soporte</h2>
            <p className="mt-2">
              Para dudas sobre el contenido o dificultades de acceso, utiliza los canales de soporte
              disponibles en tu área de compra de Cakto. Para asuntos relacionados con el
              procesamiento del pago, también puedes utilizar los canales de ayuda indicados por
              Cakto.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">7. Reembolsos</h2>
            <p className="mt-2">
              Buen Bocado ofrece un plazo de solicitud de reembolso de 7 días. Consulta la Política
              de reembolso para conocer el alcance y cómo realizar la solicitud. Esta condición no
              limita los derechos obligatorios que puedan corresponderte según la legislación
              aplicable.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">
              8. Disponibilidad y actualizaciones
            </h2>
            <p className="mt-2">
              Se procura mantener disponible la página y el acceso al contenido, pero pueden existir
              interrupciones por mantenimiento o causas ajenas al proyecto. Las actualizaciones
              futuras solo se proporcionarán cuando estén disponibles y según lo indicado para el
              plan adquirido.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">9. Modificaciones</h2>
            <p className="mt-2">
              Estos términos pueden actualizarse cuando sea necesario. La versión publicada en esta
              página será la vigente. Los cambios no eliminan derechos que no puedan excluirse
              conforme a la legislación aplicable.
            </p>
          </section>
        </div>
        <p className="mt-10 border-t pt-5 text-sm text-muted-foreground">
          Atención al comprador: utiliza los canales de soporte indicados por Cakto en tu compra.
        </p>
      </article>
    </main>
  );
}
