// services/wordService.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Recreamos __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/**
 * data: objeto con las claves que coincidan exactamente con tus marcadores
 *       en plantilla.docx, p.ej.:
 *   {
 *     folio: number|string,
 *     razonSocial: string,
 *     direccion: string,
 *     nombreMuestrta: string,
 *     temperatura: number|string,
 *     desviaciones: string,
 *     valorH: number|string,
 *     valorC: number|string,
 *     valorP: number|string,
 *     valorF: number|string,
 *     valorCH: number|string,
 *     valorS: number|string,
 *     valorGT: number|string,
 *     valorGS: number|string,
 *     valorGP: number|string,
 *     valorGM: number|string,
 *     valorGTLS: number|string,
 *     valorKCAL: number|string,
 *     valorKJ: number|string
 *   }
 */
export function generateWordFromTemplate(data) {
  // 1) Construye la ruta a /templates/plantilla.docx
  const tplPath = path.resolve(__dirname, "../templates/plantilla.docx");
  
  // 2) Comprueba que exista
  if (!fs.existsSync(tplPath)) {
    throw new Error(`No encontré plantilla.docx en: ${tplPath}`);
  }

  // 3) Carga el binario de la plantilla
  const content = fs.readFileSync(tplPath, "binary");

  // 4) Inicializa PizZip + Docxtemplater
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{{", end: "}}" }
  });

  try {
    doc.render(data);
  } catch (error) {
    console.error("Error rellenando plantilla.docx:", error);
    throw error;
  }

  // 7) Genera y devuelve el Buffer del .docx
  return doc.getZip().generate({ type: "nodebuffer" });
}
