// services/convertService.js
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import ConvertApi from 'convertapi';

const convertApi = ConvertApi('');

export async function docxToPdf(docxBuffer) {
  // 1) escribe un .docx temporal
  const tmpPath = path.join(os.tmpdir(), `reporte-${crypto.randomUUID()}.docx`);
  await fs.writeFile(tmpPath, docxBuffer);

  try {
    // 2) conviértelo
    const result = await convertApi.convert(
      'pdf',
      { File: tmpPath, FileName: path.basename(tmpPath) },
      'docx'
    );

    // 3) inspecciona qué recibiste (descomenta si quieres debug):
    // console.log(JSON.stringify(result, null, 2));

    // 4) extrae la URL correcta
    const fileEntry = Array.isArray(result.files)
      ? result.files[0]
      : result.file || result.Files?.[0];

    const pdfUrl = fileEntry?.Url || fileEntry?.url;
    if (!pdfUrl) {
      throw new Error(`No se encontró URL en la respuesta: ${Object.keys(result)}`);
    }

    // 5) descárgalo con el fetch global
    const resp = await fetch(pdfUrl);
    if (!resp.ok) {
      throw new Error(`Error descargando PDF: ${resp.statusText}`);
    }
    const arrayBuffer = await resp.arrayBuffer();
    return Buffer.from(arrayBuffer);

  } finally {
    // 6) limpia el temporal
    fs.unlink(tmpPath).catch(() => {});
  }
}
