import { fileURLToPath } from 'url';
import path from 'path';
import PDFDocument from 'pdfkit';
import coords from '../utils/coords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export async function generatePdf(resultados) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'letter', margin: 0 });
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Sólo queremos hasta 3 páginas
    resultados.slice(0, 3).forEach((data, pageIndex) => {
      if (pageIndex > 0) doc.addPage();

      const tplPath = path.join(
        __dirname,
        '..',
        'templates',
        `pagina${pageIndex + 1}.jpg`
      );
      console.log('Cargando plantilla desde:', tplPath);

      doc.image(tplPath, 0, 0, {
        width: doc.page.width,
        height: doc.page.height
      });

      const coordSet = coords[`page${pageIndex + 1}`] || {};
      Object.entries(coordSet).forEach(([key, { x, y }]) => {
        const raw = data[key];
        const text = raw != null
          ? (typeof raw === 'number' ? raw.toFixed(2) : String(raw))
          : '';
        doc.font('Helvetica').fontSize(10).fillColor('black');
        doc.text(text, x, y);
      });
    });

    doc.end();
  });
}
