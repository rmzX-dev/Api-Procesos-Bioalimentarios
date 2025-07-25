import Folav from "../../models/folavModel/folavModel.js";
import { generateWordFromTemplate } from "../../services/wordService.js";
import { docxToPdf } from "../../services/convertService.js";
import { formatearFechaCorta, generarFechaFormatoReporte } from '../../utils/fecha.js';

class FolavController {

    static async getAllFolav(req, res) {
        try {
            const folavs = await Folav.getFolavs();
            res.json(folavs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getFolavById(req, res) {
        try {
            const folav = await Folav.findFolavById(req.params.id);
            const format = req.query.format === "pdf" ? "pdf" : "docx";
            if (!folav) {
                return res.status(404).json({ message: "Folav not found" });
            }

            console.log(folav);
            const fecha = generarFechaFormatoReporte(new Date(folav.folav_fecha));
            const DM = formatearFechaCorta(folav.fechamuestreo);     
            const DR = formatearFechaCorta(folav.fecharecepcion);    
            const DI = formatearFechaCorta(folav.fechainicio);        
            const DT = formatearFechaCorta(folav.fechatermino);    

            // 2) Genera el Buffer (DOCX o PDF)
            const fmt = (v) => {
                const num = parseFloat(v);
                if (isNaN(num)) {
                    // Si no es número, devuelve el texto original tal cual (como "no detectable")
                    return v || "N/D"; // si es null o vacío, devuelve "N/D"
                }
                return num.toFixed(2);
            };

            const data = {
                folio: folav.folio,
                nombreMuestrta: folav.muestra_descripcion,
                razonSocial: folav.cliente_razon_social,
                temperatura: folav.temperatura,
                direccion: folav.cliente_direccion,
                fecha: fecha,
                desviaciones: folav.desviacion,
                DM: DM,
                DR: DR,
                DI: DI,
                DT: DT,
                analista: folav.analista,

                // Valores numéricos redondeados a 2 decimales
                valorH: fmt(folav.humedad_resultado),
                valorC: fmt(folav.cenizas_resultado),
                valoP: fmt(folav.proteinas_resultado),
                valorF: fmt(folav.fibra_resultado),
                valorCH: fmt(folav.carbohidratos_resultado),
                valorS: fmt(folav.sodio_resultado),

                // Ácidos grasos
                valorGT: fmt(folav.grasas_trans),
                valorGS: fmt(folav.grasas_saturadas),
                valorGM: fmt(folav.grasas_monoinsaturadas),
                valorGP: fmt(folav.grasas_polyinsaturadas),
                valorGTLS: fmt(folav.grasas_total),

                // Energía
                valorKCAL: fmt(folav.energetico_kcal),
                valorKJ: fmt(folav.energetico_kj),

                // Acreditaciones (textos)
                AH: folav.humedad_acreditacion,
                AC: folav.cenizas_acreditacion,
                AP: folav.proteinas_acreditacion,
                AF: folav.fibra_acreditacion,
                ACH: folav.carbohidratos_acreditacion,
                AS: folav.sodio_acreditacion,
                AG: folav.grasas_acreditacion
            };

            // 4) Generar el Word usando docxtemplater
            const docxBuffer = await generateWordFromTemplate(data);

            // 5) Si piden PDF, convertirlo
            let fileBuffer = docxBuffer,
                mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ext = "docx";

            if (format === "pdf") {
                fileBuffer = await docxToPdf(docxBuffer);
                mime = "application/pdf";
                ext = "pdf";
            }

            // 6) Enviar al cliente como adjunto
            res
                .status(200)
                .set({
                    "Content-Type": mime,
                    "Content-Disposition": `attachment; filename="FOLAB-${folav.folio}.${ext}"`,
                })
                .send(fileBuffer);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteFolav(req, res) {
        const { id } = req.params;

        try {
            const result = await Folav.deleteFolav(id);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'FOLAV no encontrado' });
            }

            res.json({ message: 'FOLAV eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar FOLAV:', error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    }
}


export default FolavController;