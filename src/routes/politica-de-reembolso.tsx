import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-reembolso")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-bold text-primary hover:underline">
          ← Volver a Buen Bocado
        </a>
        <p className="eyebrow mt-8">Información de compra</p>
        <h1 className="mt-3 text-4xl font-extrabold text-primary">Política de reembolso</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: 5 de noviembre de 2026
        </p>
        <div className="mt-8 space-y-6 text-base leading-7 text-muted-foreground">
          <section>
            <h2 className="text-xl font-extrabold text-primary">1. Plazo de solicitud</h2>
            <p className="mt-2">
              Puedes solicitar el reembolso de tu compra de Buen Bocado dentro de los 7 días
              siguientes a la compra. La solicitud debe realizarse dentro de ese plazo.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">2. Cómo solicitarlo</h2>
            <p className="mt-2">
              Solicita el reembolso mediante los canales de soporte de Cakto asociados a tu compra e
              indica el correo utilizado en el pedido, la fecha aproximada y el número o comprobante
              de la transacción, si lo tienes. También puedes utilizar el canal de soporte de Cakto
              asociado a tu compra. No envíes números completos de tarjeta ni contraseñas.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">3. Procesamiento</h2>
            <p className="mt-2">
              Una vez recibida la solicitud, se verificará la transacción y se gestionará el trámite
              correspondiente mediante Cakto y el proveedor de pago. El tiempo para que el importe
              aparezca reflejado puede depender del medio de pago y de los plazos de la entidad
              financiera o del proveedor. La confirmación y el estado de la operación se comunicarán
              mediante los canales vinculados al pedido cuando estén disponibles.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">4. Derechos del comprador</h2>
            <p className="mt-2">
              Esta política describe el plazo comercial de 7 días informado por Buen Bocado y no
              pretende limitar derechos de desistimiento, garantía o protección al consumidor que
              sean obligatorios conforme a la legislación aplicable en tu país.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-primary">5. Contacto</h2>
            <p className="mt-2">
              Si tienes dudas sobre una solicitud, utiliza los canales de soporte de Cakto asociados
              a tu compra. Para consultar el estado técnico de un pago, ten a mano los datos de tu
              pedido y utiliza también los canales de atención de Cakto.
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
