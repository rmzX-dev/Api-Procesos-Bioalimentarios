// services/wordService.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";


// Recreamos __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
export function generateWordFromTemplate(data) {
  if (data.excesoCA === undefined) {
    throw new Error("Debe proporcionar el campo excesoCA");
  }
  if (data.excesoSO === undefined) {
    throw new Error("Debe proporcionar el campo excesoSO");
  }
  if (data.excesoGT === undefined) {
    throw new Error("Debe proporcionar el campo excesoGT");
  }
  if (data.excesoAZ === undefined) {
    throw new Error("Debe proporcionar el campo excesoAZ");
  }
  if (data.excesoGS === undefined) {
    throw new Error("Debe proporcionar el campo excesoGS");
  }

  data.excesoCAI = data.excesoCA === "Sí" ? path.resolve(__dirname, "../templates/images/CALORIAS.png") : "";
  data.excesoSOI = data.excesoSO === "Sí" ? path.resolve(__dirname, "../templates/images/SODIO.png") : "";
  data.excesoGTI = data.excesoGT === "Sí" ? path.resolve(__dirname, "../templates/images/GRASAS-TRANS.png") : "";
  data.excesoAZI = data.excesoAZ === "Sí" ? path.resolve(__dirname, "../templates/images/AZUCARES.png") : "";
  data.excesoGSI = data.excesoGS === "Sí" ? path.resolve(__dirname, "../templates/images/GRASAS-SATURADAS.png") : "";



  // 1) Construye la ruta a /templates/plantilla.docx
  const tplPath = path.resolve(__dirname, "../templates/plantilla2.docx");
  
  // 2) Comprueba que exista
  if (!fs.existsSync(tplPath)) {
    throw new Error(`No encontré plantilla2.docx en: ${tplPath}`);
  }

  // 3) Carga el binario de la plantilla
  const content = fs.readFileSync(tplPath, "binary");

  // 4) Inicializa PizZip + Docxtemplater
  const zip = new PizZip(content);

  // 👉 Calcular cantidad de imágenes activas antes
  const activeImagesCount = [
    data.excesoCAI,
    data.excesoSOI,
    data.excesoGTI,
    data.excesoAZI,
    data.excesoGSI
  ].filter(img => img && img !== "").length;



  // 🔧 Módulo de imágenes
  // Configurar el módulo de imágenes para docxtemplater
  const imageModule = new ImageModule({
  centered: false,
  getImage: function (tagValue, tagName) {
    // 1. Verifica que la etiqueta tenga un valor. Si no hay valor, retorna null.
    if (!tagValue) {
      return null;
    }

    // 2. Imprime la ruta para verificar que sea correcta
    //console.log(`Intentando cargar la imagen para la etiqueta ${tagName} en: ${tagValue}`);

    try {
      // 3. Lee el archivo y retorna su contenido binario
      const imageBuffer = fs.readFileSync(tagValue);
      return imageBuffer;
    } catch (error) {
      // 4. Si hay un error (ej. archivo no encontrado), lo registra y retorna null
      console.error(`Error al leer el archivo de imagen en la ruta: ${tagValue}`, error);
      return null;
    }
  },
   getSize: function (img, tagValue, tagName) {
      let size = 100;

      switch (activeImagesCount) {
        case 1:
          size = 600;
          break;
        case 2:
          size = 300;
          break;
        case 3:
          size = 200;
          break;
        case 4:
          size = 150;
          break;
        case 5:
          size = 120;
          break;
        default:
          size = 60;
      }

      return [size, size];
    },
});

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{{", end: "}}" },
    modules: [imageModule],
  });

  try {
    doc.render(data);
  } catch (error) {
    console.error("Error rellenando plantilla2.docx:", error);
    throw error;
  }

  // 7) Genera y devuelve el Buffer del .docx
  return doc.getZip().generate({ type: "nodebuffer" });
}