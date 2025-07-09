// utils/fecha.js
export function generarFechaFormatoReporte() {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mes = meses[hoy.getMonth()];
  const anio = hoy.getFullYear();

  return `Cuitláhuac, Ver., a ${dia} de ${mes} del ${anio}`;
}