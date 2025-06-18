import xlsx from "xlsx";
//import knex from "../db/knex";

class ExcelController {
    static async procesarMultiplesArchivos(req, res) {
    try {
      const archivos = req.files;
      if (!archivos || archivos.length === 0) {
        return res.status(400).json({ mensaje: "No se enviaron archivos." });
      }

      // Función que recibe el buffer de un Excel y devuelve el objeto deseado
      function parseHumidityBuffer(buffer) {
        const wb = xlsx.read(buffer, { type: "buffer" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

        // 1) Extraer folio y descripción
        let folio, descripcion, descRowIdx = -1;
        for (let r = 0; r < 10; r++) {
          const rowUp = rows[r].map(c => (c || "").toString().trim().toUpperCase());
          if (rowUp[0] === "FOLIO DE LA MUESTRA:") {
            folio = rows[r][2];
          }
          if (rowUp[0] === "DESCRIPCIÓN DE LA MUESTRA:") {
            descripcion = rows[r][2];
            descRowIdx = r;
          }
        }

        // 2) Extraer unidades de la fila anterior a la descripción
        let unidades = null;
        if (descRowIdx > 0) {
          const prev = rows[descRowIdx - 1].map(c => (c || "").toString().trim().toUpperCase());
          const idx = prev.findIndex(cell => cell.startsWith("UNIDADES"));
          if (idx !== -1) unidades = rows[descRowIdx - 1][idx + 1] || null;
        }

        // 3) Extraer todos los valores de “Promedio de % Humedad (g/100g)”
        const headerRowIdx = rows.findIndex(r =>
          r.some(c => c && c.toString().includes("Promedio de % Humedad"))
        );
        const promedios = [];
        if (headerRowIdx !== -1) {
          const colIdx = rows[headerRowIdx]
            .findIndex(c => c && c.toString().includes("Promedio de % Humedad"));
          for (let r = headerRowIdx + 1; r < rows.length; r++) {
            const cell = rows[r][colIdx];
            if (cell == null || cell === "") break;
            promedios.push(cell);
          }
        }

        return { folio, descripcion, unidades, promediosHumedad: promedios };
      }

      const resultados = archivos.map(({ originalname, buffer }) => {
        const datos = parseHumidityBuffer(buffer);
        return { nombre: originalname, ...datos };
      });

      console.log("📊 Resultados extraídos:", JSON.stringify(resultados, null, 2));

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