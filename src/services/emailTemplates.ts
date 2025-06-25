export function createDebtEmailTemplate(deuda: any) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        ${getEmailStyles()}
      </style>
    </head>
    <body>
      ${getEmailBody(deuda)}
    </body>
    </html>
  `.trim();

  const textContent = createTextContent(deuda);
  
  return { htmlContent, textContent };
}

function getEmailStyles() {
  return `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 4px;
      border: 1px solid #e9ecef;
    }
    .details {
      background-color: white;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      border: 1px solid #e9ecef;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
    }
    .details-table td {
      padding: 8px;
      border-bottom: 1px solid #e9ecef;
    }
    .details-table td:first-child {
      font-weight: bold;
      width: 40%;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
    }
  `;
}

function getEmailBody(deuda: any) {
  const mensajeDeuda = deuda.DiasRestantes < 0 
    ? `Su deuda de $${deuda.MontoDeuda} está vencida por ${Math.abs(deuda.DiasRestantes)} días`
    : `Su deuda de $${deuda.MontoDeuda} vencerá en ${deuda.DiasRestantes} días`;

  return `
    <div class="header">
      <h1>Notificación de Deuda</h1>
    </div>
    <div class="content">
      ${getEmailContent(deuda, mensajeDeuda)}
    </div>
  `;
}

function createTextContent(deuda: any) {
  const mensajeDeuda = deuda.DiasRestantes < 0 
    ? `Su deuda de $${deuda.MontoDeuda} está vencida por ${Math.abs(deuda.DiasRestantes)} días`
    : `Su deuda de $${deuda.MontoDeuda} vencerá en ${deuda.DiasRestantes} días`;

  return mensajeDeuda
}

function getEmailContent(deuda: any, mensajeDeuda: string) {
  return `
    <div style="margin-bottom: 20px;">
      <p>Estimado/a ${deuda.Nombre} ${deuda.Apellidos},</p>
      <p>${mensajeDeuda}</p>
    </div>

    <div class="details">
      <h2>Detalles de la Deuda:</h2>
      <table class="details-table">
        <tr>
          <td>Monto:</td>
          <td>$${deuda.MontoDeuda}</td>
        </tr>
        <tr>
          <td>Fecha Vencimiento:</td>
          <td>${new Date(deuda.FechaVencimientoDeuda).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Estado:</td>
          <td>${deuda.DiasRestantes < 0 ? 'Vencida' : 'Por vencer'}</td>
        </tr>
      </table>
    </div>

    ${deuda.LinkDeCobro ? `
      <div style="text-align: center; margin: 20px 0;">
        <a href="${deuda.LinkDeCobro}" class="button">
          Realizar Pago
        </a>
      </div>
    ` : ''}

    <p>Por favor, realice el pago lo antes posible.</p>

    <div class="footer">
      <p>Saludos cordiales,<br><strong>Sistema de Cobranzas</strong></p>
    </div>
  `;
}
