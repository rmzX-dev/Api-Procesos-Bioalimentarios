import xlsx from "xlsx";
//import { generatePdf } from "../../services/pdfService.js";
import { generateWordFromTemplate } from "../../services/wordService.js";

class ExcelController {
  static async procesarMultiplesArchivos(req, res) {
    try {
      const archivos = req.files;
      if (!archivos?.length) {
        return res.status(400).json({ mensaje: "No se enviaron archivos." });
      }

      // ── Helper común ────────────────────────────────────
      function findValue(rows, label, colOffset = 2) {
        const idx = rows.findIndex(r =>
          r[0] && r[0].toString().toUpperCase().includes(label.toUpperCase())
        );
        return idx !== -1 ? rows[idx][colOffset] : undefined;
      }

      // ── Parser de Humedad ────────────────────────────────────
      function parseHumidityBuffer(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const folio = findValue(rows, "FOLIO DE LA MUESTRA:");
        const descripcion = findValue(rows, "DESCRIPCIÓN DE LA MUESTRA:");

        const promedios = [];
        const headerIdx = rows.findIndex(r =>
          r.some(c => c && c.toString().toUpperCase().includes("PROMEDIO DE % HUMEDAD"))
        );
        if (headerIdx !== -1) {
          const colIdx = rows[headerIdx]
            .findIndex(c => c && c.toString().toUpperCase().includes("PROMEDIO DE % HUMEDAD"));
          for (let i = headerIdx + 1; i < rows.length; i++) {
            const raw = rows[i][colIdx];
            if (raw == null || raw === "") break;
            promedios.push(raw);
          }
        }

        return { folio, descripcion, promediosHumedad: promedios };
      }


      //CENIZAS
      /**
 * @param {Buffer} buffer
 * @returns {{ folio: string|number|null, muestra: string|null, cenizasPromedio: string|number|null }}
 */
      function parseAshBuffer(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 1) Encuentra la fila de encabezado con “PROMEDIO” y “CENIZAS”
        const headerIdx = rows.findIndex(row => {
          const norm = row.map(normalize);
          return norm.some(h => h.includes("PROMEDIO")) && norm.some(h => h.includes("CENIZAS"));
        });
        if (headerIdx === -1) {
          throw new Error("No se encontró encabezado de Promedio de Cenizas");
        }

        // 2) Obtén los índices de columna
        const header = rows[headerIdx].map(normalize);
        const promCol = header.findIndex(h => h.includes("PROMEDIO") && h.includes("CENIZAS"));
        const folioCol = header.findIndex(h => h.includes("FOLIO"));
        const muestraCol = header.findIndex(h => h.includes("MUESTRA"));

        if (promCol < 0) {
          throw new Error("No se pudo mapear la columna de Promedio de Cenizas");
        }

        // 3) Lee la fila de datos justo debajo del encabezado
        const dataRow = rows[headerIdx + 1] || [];
        return {
          folio: folioCol >= 0 ? dataRow[folioCol] : null,
          muestra: muestraCol >= 0 ? dataRow[muestraCol] : null,
          cenizasPromedio: dataRow[promCol] ?? null
        };
      }

      //PROTEINAS
      /**
 * @param {Buffer} buffer
 * @returns {{ folio: string|number|null, muestra: string|null, proteina: string|number|null }}
 */
      function parseProteinBuffer(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 1) Encontrar la fila de encabezado que tenga "%PROTEINA"
        const headerIdx = rows.findIndex(row =>
          row.some(cell => normalize(cell).includes("%PROTEINA"))
        );
        if (headerIdx === -1) {
          throw new Error("No se encontró la fila de encabezado '%Proteína'");
        }

        // 2) Mapear índices de columnas clave
        const header = rows[headerIdx].map(normalize);
        const protCol = header.findIndex(h => h.includes("%PROTEINA"));
        // buscamos FOLIO o IDENTIFICACION
        const folioCol = header.findIndex(h => h.includes("FOLIO") || h.includes("IDENTIFICACION"));
        const muestraCol = header.findIndex(h => h.includes("MUESTRA"));

        if (protCol < 0) {
          throw new Error("No se pudo mapear la columna '%Proteína'");
        }

        // 3) Leer la fila de datos justo debajo
        const dataRow = rows[headerIdx + 1] || [];

        return {
          folio: folioCol >= 0 ? dataRow[folioCol] : null,
          muestra: muestraCol >= 0 ? dataRow[muestraCol] : null,
          proteina: dataRow[protCol] ?? null
        };
      }



      ///FIBRA
      /**
 * @param {Buffer} buffer
 * @param {string|number} targetFolio
 */
      function parseFiberBuffer(buffer, targetFolio) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 1) Buscar fila título con FIBRA y RESULTADOS
        const titleIdx = rows.findIndex(r => {
          const norm = r.map(normalize).join(" ");
          return norm.includes("FIBRA") && norm.includes("RESULTADOS");
        });
        if (titleIdx === -1) {
          throw new Error("No se encontró la sección de Fibra Dietaria");
        }

        // 2) Buscar la siguiente fila que contenga "FOLIO"
        let headerIdx = -1;
        for (let i = titleIdx + 1; i < rows.length; i++) {
          if (rows[i].map(normalize).includes("FOLIO")) {
            headerIdx = i;
            break;
          }
        }
        if (headerIdx === -1) {
          throw new Error("No se encontró la fila de encabezados tras el título de Fibra Dietaria");
        }

        // 3) Mapear índices
        const header = rows[headerIdx].map(normalize);
        const folioCol = header.findIndex(h => h.includes("FOLIO"));
        const muestraCol = header.findIndex(h => h.includes("MUESTRA"));
        const resCol = header.findIndex(h => h.includes("RESULTADOS"));

        if (folioCol < 0 || muestraCol < 0 || resCol < 0) {
          throw new Error("No se pudieron mapear las columnas de Fibra Dietaria");
        }

        // 4) Recorrer filas buscando targetFolio
        for (let i = headerIdx + 1; i < rows.length; i++) {
          const row = rows[i];
          const cell = row[folioCol];
          if (cell == null || cell === "") break;
          if (String(cell).trim() === String(targetFolio)) {
            return {
              folio: cell,
              muestra: row[muestraCol] || null,
              resultado: row[resCol] || null
            };
          }
        }

        return { error: `Folio ${targetFolio} no encontrado en Fibra Dietaria` };
      }

      /**
      * @param {Buffer} buffer
      * @param {string|number} targetFolio
      */

      // ── Parser de Grasas ────────────────────────────────────
      function parseFatsBuffer(buffer, targetFolio) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        // 1) Normalización para buscar encabezados
        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 2) Encontrar fila de encabezado que tenga "FOLIO" y alguno de los campos de grasa
        const headerIdx = rows.findIndex(r => {
          const norm = r.map(normalize);
          return norm.includes("FOLIO") && norm.some(h =>
            h.includes("% DE GRASAS") ||
            h.includes("GRASA TOTAL") ||
            h.includes("GRASAS SATURADAS")
          );
        });
        if (headerIdx === -1) {
          throw new Error("No se encontró la fila de encabezados de Grasas");
        }

        // 3) Mapear índices de columnas
        const header = rows[headerIdx].map(normalize);
        const folioCol = header.findIndex(h => h === "FOLIO");
        const idxOf = key => header.findIndex(h => h.includes(key));
        const transCol = idxOf("% DE GRASAS TRANS");
        const satCol = idxOf("GRASAS SATURADAS");
        const poliCol = idxOf("GRASAS POLIINSATURADAS");
        const monoCol = idxOf("GRASAS MONOINSATURADAS");
        const totalCol = idxOf("GRASA TOTAL");

        if (folioCol < 0) {
          throw new Error("Columna FOLIO no encontrada en Grasas");
        }

        // 4) Recorrer filas buscando targetFolio
        for (let i = headerIdx + 1; i < rows.length; i++) {
          const row = rows[i];
          const cell = row[folioCol];
          if (cell == null || cell === "") break;  // fin de tabla
          if (String(cell).trim() === String(targetFolio)) {
            return {
              folio: cell,
              porcentajeGrasasTrans: row[transCol] || null,
              porcentajeGrasasSaturadas: row[satCol] || null,
              porcentajeGrasasPoliinsaturadas: row[poliCol] || null,
              porcentajeGrasasMonoinsaturadas: row[monoCol] || null,
              porcentajeGrasaTotal: row[totalCol] || null,
            };
          }
        }

        return { error: `Folio ${targetFolio} no encontrado en Grasas` };
      }

      // ── Parser robusto de Sodio ────────────────────────────────────
      /**
       * @param {Buffer} buffer
       * @param {string|number} targetFolio
       */
      function parseSodiumBuffer(buffer, targetFolio) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        // Normaliza texto: mayúsculas, sin tildes, sin espacios extras
        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 1) Encontrar fila de encabezado que tenga "FOLIO" y "100G"
        const headerIdx = rows.findIndex(r => {
          const norm = r.map(normalize);
          return norm.some(c => c.includes("FOLIO")) &&
            norm.some(c => c.includes("100G"));
        });
        if (headerIdx === -1) {
          throw new Error("No se encontró la fila de encabezados de Sodio");
        }

        // 2) Mapear columnas
        const header = rows[headerIdx].map(normalize);
        const folioCol = header.findIndex(h => h === "FOLIO");
        const nombreCol = header.findIndex(h => h.includes("NOMBRE"));
        const mgCol = header.findIndex(
          h => (h.includes("MG") && h.includes("100G")) ||
            (h.includes("UG") && h.includes("100G"))
        );
        if (folioCol < 0 || mgCol < 0) {
          throw new Error("No se pudo mapear columnas FOLIO o MG/100G");
        }

        // 3) Recorrer filas buscando targetFolio
        for (let i = headerIdx + 1; i < rows.length; i++) {
          const row = rows[i];
          const cellFolio = row[folioCol];
          if (cellFolio == null || cellFolio === "") break;
          if (String(cellFolio).trim() === String(targetFolio)) {
            return {
              folio: cellFolio,
              descripcion: row[nombreCol] || null,
              mg: row[mgCol] || null
            };
          }
        }

        return { error: `Folio ${targetFolio} no encontrado en Sodio` };
      }

      //CONTENIDO ENERGETICO Y CARBHOIDRATOS
      /**
 * @param {Buffer} buffer
 * @returns {{
 *   folio: string|number|null,
 *   muestra: string|null,
 *   carbohidratos: string|number|null,
 *   energiaKcal:    string|number|null,
 *   energiaKJ:      string|number|null
 * }}
 */
      function parseCarbsAndEnergy(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // — 1) Carbohidratos: misma lógica que antes —
        const carbIdx = rows.findIndex(r =>
          r.some(c => normalize(c).includes("CARBOHIDRATOS"))
        );
        if (carbIdx === -1) {
          throw new Error("No se encontró encabezado de Carbohidratos");
        }
        const carbHeader = rows[carbIdx].map(normalize);
        const folioCol = carbHeader.findIndex(h => h.includes("FOLIO"));
        const muestraCol = carbHeader.findIndex(h => h.includes("MUESTRA"));
        const carbCol = carbHeader.findIndex(h => h.includes("CARBOHIDRATOS"));
        const carbRow = rows[carbIdx + 1] || [];

        const folio = folioCol >= 0 ? carbRow[folioCol] : null;
        const muestra = muestraCol >= 0 ? carbRow[muestraCol] : null;
        const carbohidratos = carbRow[carbCol] ?? null;

        // — 2) Energía: buscar por “KCAL” y “KJ” en la misma fila —
        let energiaKcal = null, energiaKJ = null;
        try {
          const energyIdx = rows.findIndex(r => {
            const norm = r.map(normalize);
            return norm.some(h => h.includes("KCAL")) && norm.some(h => h.includes("KJ"));
          });
          if (energyIdx !== -1) {
            const energyHeader = rows[energyIdx].map(normalize);
            const kcalCol = energyHeader.findIndex(h => h.includes("KCAL"));
            const kjCol = energyHeader.findIndex(h => h.includes("KJ"));
            const energyRow = rows[energyIdx + 1] || [];
            energiaKcal = energyRow[kcalCol] ?? null;
            energiaKJ = energyRow[kjCol] ?? null;
          }
        } catch {
          // si algo falla, dejamos los valores en null
        }

        return { folio, muestra, carbohidratos, energiaKcal, energiaKJ };
      }




      // ── 1) Extraer folio de Humedad ────────────────────────
      let targetFolio;
      for (const { buffer } of archivos) {
        const flat = xlsx.utils
          .sheet_to_json(
            xlsx.read(buffer, { type: "buffer" })
              .Sheets[xlsx.read(buffer, { type: "buffer" }).SheetNames[0]],
            { header: 1, defval: null }
          )
          .flat()
          .map(c => (c || "").toString().toUpperCase());
        if (flat.some(cell => cell.includes("PROMEDIO DE % HUMEDAD"))) {
          targetFolio = parseHumidityBuffer(buffer).folio;
          break;
        }
      }
      if (targetFolio == null) {
        return res
          .status(400)
          .json({ mensaje: "No se encontró un folio de Humedad para usar en Sodio." });
      }

      // ── 2) Procesar todos los archivos ───────────────────────
      const resultados = archivos.map(({ originalname, buffer }) => {
        const flat = xlsx.utils
          .sheet_to_json(
            xlsx.read(buffer, { type: "buffer" })
              .Sheets[xlsx.read(buffer, { type: "buffer" }).SheetNames[0]],
            { header: 1, defval: null }
          )
          .flat()
          .map(c => (c || "").toString().toUpperCase());

        // Procesar carbohidratos + energía _antes_ de proteína:
        if (
          originalname.toUpperCase().includes("CARBOHIDRATOS") ||
          flat.some(cell => cell.includes("CARBOHIDRATOS"))
        ) {
          const { folio, muestra, carbohidratos, energiaKcal, energiaKJ } =
            parseCarbsAndEnergy(buffer);
          return { nombre: originalname, folio, muestra, carbohidratos, energiaKcal, energiaKJ };
        }


        if (flat.some(cell => cell.includes("PROMEDIO DE % HUMEDAD"))) {
          return { nombre: originalname, ...parseHumidityBuffer(buffer) };
        }

        if (
          originalname.toUpperCase().includes("PROTEINA") ||
          flat.some(cell => cell.includes("PROTEINA"))
        ) {
          const { folio, muestra, proteina } = parseProteinBuffer(buffer);
          return { nombre: originalname, folio, muestra, proteina };
        }

        // procesar Cenizas8/
        if (
          originalname.toUpperCase().includes("CENIZAS") ||
          flat.some(cell => cell.includes("CENIZAS"))
        ) {
          const { cenizasPromedio } = parseAshBuffer(buffer);
          return { nombre: originalname, cenizasPromedio };
        }


        if (flat.some(cell =>
          cell.includes("FIBRA")
        )
        ) {
          return {
            nombre: originalname,
            ...parseFiberBuffer(buffer, targetFolio)
          };
        }
        if (
          flat.some(cell => cell.includes("% DE GRASAS TRANS")) ||
          flat.some(cell => cell.includes("% DE GRASAS SATURADAS"))
        ) {
          return { nombre: originalname, ...parseFatsBuffer(buffer, targetFolio) };
        }
        if (flat.some(cell => cell.includes("SODIO")) || flat.some(cell => cell.includes("100G"))) {
          return { nombre: originalname, ...parseSodiumBuffer(buffer, targetFolio) };
        }

        return { nombre: originalname, error: "Formato no soportado" };
      });

      //console.log(">>> resultados:", resultados);

      // Tras obtener `resultados`...
      const humedadObj = resultados.find(r => Array.isArray(r.promediosHumedad));
      const cenizasObj = resultados.find(r => r.cenizasPromedio != null);
      const proteinaObj = resultados.find(r => r.proteina != null);
      const fibraObj = resultados.find(r => r.resultado != null);
      const carbObj = resultados.find(r => r.carbohidratos != null);
      const sodioObj = resultados.find(r => r.mg != null);
      const grasasObj = resultados.find(r => r.porcentajeGrasasTrans != undefined);

      // Validación rápida
      if (!humedadObj || !cenizasObj || !proteinaObj || !fibraObj ||
        !carbObj || !sodioObj || !grasasObj) {
        return res.status(400).json({
          mensaje: "Faltan datos de alguna sección (humedad, cenizas, proteína, etc.)"
        });
      }

      // helper para dos decimales
      const fmt = num => typeof num === "number"
        ? parseFloat(num.toFixed(2))
        : num;


      // Mapea TODO en un SOLO objeto:
      const data = {
        folio: humedadObj.folio,

        valorH: fmt(humedadObj.promediosHumedad[0]),
        valorC: fmt(cenizasObj.cenizasPromedio),
        valoP: fmt(proteinaObj.proteina),       // <— ahora 6.56 en lugar de 6.5614...
        valorF: fmt(fibraObj.resultado),
        valorCH: fmt(carbObj.carbohidratos),
        valorS: fmt(sodioObj.mg),
        valorGT: fmt(grasasObj.porcentajeGrasasTrans),
        valorGS: fmt(grasasObj.porcentajeGrasasSaturadas),
        valorGP: fmt(grasasObj.porcentajeGrasasPoliinsaturadas),
        valorGM: fmt(grasasObj.porcentajeGrasasMonoinsaturadas),
        valorGTLS: fmt(grasasObj.porcentajeGrasaTotal),

        valorKCAL: fmt(carbObj.energiaKcal),
        valorKJ: fmt(carbObj.energiaKJ),
      };
      // 2) Genera el Word con docxtemplater
      const docxBuffer = generateWordFromTemplate(data);

      /* // 1) Reúne cada sección en su objeto de página
       const humedadObj = resultados.find(r => r.promediosHumedad);
       const cenizasObj = resultados.find(r => r.cenizasPromedio);
       const proteinaObj = resultados.find(r => r.proteina);
       const fibraObj = resultados.find(r => r.resultado);
       const carbObj = resultados.find(r => r.carbohidratos);
       const energiaObj = resultados.find(r => r.energiaKcal);
       const sodioObj = resultados.find(r => r.mg);
       const grasasObj = resultados.find(r => r.porcentajeGrasasTrans !== undefined);
 
       // 2) Construye los 3 objetos
       const page1 = {
         folio: humedadObj?.folio ?? '',
         humedad: humedadObj?.promediosHumedad?.[0] ?? '',
         cenizas: cenizasObj?.cenizasPromedio ?? '',
         proteinas: proteinaObj?.proteina ?? ''
       };
 
       const page2 = {
         folio: humedadObj?.folio ?? '',
         fibraDietetica: fibraObj?.resultado ?? '',
         carbohidratos: carbObj?.carbohidratos ?? '',
         sodio: sodioObj?.mg ?? '',
         grasasTrans: grasasObj?.porcentajeGrasasTrans ?? '',
         grasasSaturadas: grasasObj?.porcentajeGrasasSaturadas ?? '',
         grasasPoliinsaturadas: grasasObj?.porcentajeGrasasPoliinsaturadas ?? '',
         grasasMonoinsaturadas: grasasObj?.porcentajeGrasasMonoinsaturadas ?? '',
         grasaTotal: grasasObj?.porcentajeGrasaTotal ?? '',
         energiaKcal: energiaObj?.energiaKcal ?? '',
         energiaKJ: energiaObj?.energiaKJ ?? ''
       };
 
       const page3 = {
         folio: humedadObj?.folio ?? ''
       };
 
       // 1) Genera el PDF en memoria
       const pdfBuffer = await generatePdf([ page1, page2, page3 ]);
 
 
       // 2) Preparar respuesta para descarga
       res.setHeader('Content-Type', 'application/pdf');
       res.setHeader('Content-Disposition', 'attachment; filename="reporte.pdf"');
       return res.send(pdfBuffer);*/

      // 3) Devuelve al cliente
      res
        .status(200)
        .set({
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": 'attachment; filename="reporte.docx"',
        })
        .send(docxBuffer);

    } catch (error) {
      console.error("Error al procesar los archivos Excel:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
}

export default ExcelController;
