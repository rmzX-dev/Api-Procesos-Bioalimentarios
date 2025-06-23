import xlsx from "xlsx";

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




      /**
 * @param {Buffer} buffer
 * @returns {{folio: string|number, muestra: string|null, proteina: string|number|null}}
 */
      function parseProteinBuffer(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        // 1) Normaliza cadenas quitando tildes y forzando mayúsculas
        const normalize = str =>
          (str || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        // 2) Busca la fila de encabezados que incluya "FOLIO" y "PROTEINA"
        const headerIdx = rows.findIndex(row => {
          const norm = row.map(normalize);
          return norm.includes("FOLIO") && norm.some(h => h.includes("PROTEINA"));
        });
        if (headerIdx === -1) {
          throw new Error("No se encontró la fila de encabezados de Proteína");
        }

        // 3) Mapea columnas por inclusión
        const header = rows[headerIdx].map(normalize);
        const folioCol = header.findIndex(h => h.includes("FOLIO"));
        const muestraCol = header.findIndex(h => h.includes("MUESTRA"));
        const protCol = header.findIndex(h => h.includes("PROTEINA"));

        if (folioCol < 0 || protCol < 0) {
          throw new Error("No se pudieron mapear las columnas de Proteína");
        }

        // 4) Toma la fila inmediatamente siguiente al encabezado
        const dataRow = rows[headerIdx + 1];
        if (!dataRow) {
          throw new Error("No hay datos debajo del encabezado de Proteína");
        }

        return {
          folio: dataRow[folioCol],
          muestra: muestraCol >= 0 ? dataRow[muestraCol] : null,
          proteina: dataRow[protCol] || null
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

        if (flat.some(cell => cell.includes("PROMEDIO DE % HUMEDAD"))) {
          return { nombre: originalname, ...parseHumidityBuffer(buffer) };
        }
        if (
          // detecta proteína por nombre de archivo o porque en su contenido aparezca "PROTEINA"
          originalname.toUpperCase().includes("PROTEINA") ||
          flat.some(cell => cell.includes("PROTEINA"))
        ) {
          return { nombre: originalname, ...parseProteinBuffer(buffer) };
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

      return res.status(200).json({
        mensaje: "Archivos procesados correctamente.",
        resultados,
      });

    } catch (error) {
      console.error("Error al procesar los archivos Excel:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
}

export default ExcelController;
