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


export function formatearFechaCorta(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes empieza en 0
  const anio = fecha.getFullYear().toString().slice(-2); // últimos dos dígitos del año

  return `${dia}/${mes}/${anio}`;
}