import { generarFechaFormatoReporte, formatearFechaCorta } from '../../utils/fecha.js';
import { generateWordFromTemplate } from "../../services/nutrimentalWordService.js";
import NutrimentalModel from '../../models/nutrimentalModel/nutrimentalModel.js';

class NutrimentalController {
    /**
    * @description Genera un informe nutrimental en formato Word a partir de los datos recibidos, usando una plantilla.
    * @param {object} req - Objeto de solicitud de Express.
    * @param {object} res - Objeto de respuesta de Express.
    */
    static async generateReportNutrimental(req, res) {
        // Los datos se obtienen del cuerpo de la solicitud (Angular), no son hardcodeados.
        try {
            const dataForm = req.body;
            console.log("Datos recibidos para generar el informe:", dataForm);
            const { productoBase, ingredienteCombinar, porcionFinal } = dataForm;

            const fechaCreacion = generarFechaFormatoReporte();

            // --- Datos base del producto en polvo (por 100g) ---
            const energiaKcalBase100g = parseFloat(productoBase.energiaKcal);
            const energiaKjBase100g = parseFloat(productoBase.energiaKj);
            const proteinaGBase100g = parseFloat(productoBase.proteinaG);
            const grasasTotalesGBase100g = parseFloat(productoBase.grasasTotalesG);
            const grasasSaturadasGBase100g = parseFloat(productoBase.grasasSaturadasG);
            const grasasTransGBase100g = productoBase.grasasTransG.toString().toLowerCase() === 'no detectable' ? 0 : parseFloat(productoBase.grasasTransG);
            const hidratosCarbonoGBase100g = parseFloat(productoBase.hidratosCarbonoG);
            const azucaresGBase100g = parseFloat(productoBase.azucaresG);
            const azucaresAniadidosGBase100g = parseFloat(productoBase.azucaresAniadidosG);
            const fibraGBase100g = parseFloat(productoBase.fibraG);
            const sodioMgBase100g = parseFloat(productoBase.sodioMg);

            // --- Datos base del ingrediente líquido (por 100 ml) ---
            const energiaKcalIng100ml = parseFloat(ingredienteCombinar.energiaKcal100);
            const energiaKjIng100ml = parseFloat(ingredienteCombinar.energiaKj100);
            const proteinaGIng100ml = parseFloat(ingredienteCombinar.proteinaG100);
            const grasasTotalesGIng100ml = parseFloat(ingredienteCombinar.grasasTotalesG100);
            const grasasSaturadasGIng100ml = parseFloat(ingredienteCombinar.grasasSaturadasG100);
            const grasasTransGIng100ml = parseFloat(ingredienteCombinar.grasasTransG100);
            const hidratosCarbonoGIng100ml = parseFloat(ingredienteCombinar.hidratosCarbonoG100);
            const azucaresGIng100ml = parseFloat(ingredienteCombinar.azucaresG100);
            const azucaresAniadidosGIng100ml = parseFloat(ingredienteCombinar.azucaresAniadidosG100);
            const fibraGIng100ml = parseFloat(ingredienteCombinar.fibraG100);
            const sodioMgIng100ml = parseFloat(ingredienteCombinar.sodioMg100);

            // --- Porciones ---
            const pesoProductoBaseEnPorcion = parseFloat(productoBase.pesoPorcionBaseG); // ej. 90g polvo
            const volumenIngredienteEnPorcion = parseFloat(ingredienteCombinar.cantidadMlG);
            const porcionesPorEnvase = parseFloat(porcionFinal.porcionesPorEnvase); // ej. 5.6
            const porcionFinalMlEncase = parseFloat(porcionFinal.tamanoPorcionFinal);

            // --- Cálculo nutrientes por porción preparada ---

            const factorBase = pesoProductoBaseEnPorcion / 100;
            const energiaKcalBasePorcion = energiaKcalBase100g * factorBase;
            const energiaKjBasePorcion = energiaKjBase100g * factorBase;
            const proteinaGBasePorcion = proteinaGBase100g * factorBase;
            const grasasTotalesGBasePorcion = grasasTotalesGBase100g * factorBase;
            const grasasSaturadasGBasePorcion = grasasSaturadasGBase100g * factorBase;
            const grasasTransGBasePorcion = grasasTransGBase100g * factorBase;
            const hidratosCarbonoGBasePorcion = hidratosCarbonoGBase100g * factorBase;
            const azucaresGBasePorcion = azucaresGBase100g * factorBase;
            const azucaresAniadidosGBasePorcion = azucaresAniadidosGBase100g * factorBase;
            const fibraGBasePorcion = fibraGBase100g * factorBase;
            const sodioMgBasePorcion = sodioMgBase100g * factorBase;

            const factorIngrediente = volumenIngredienteEnPorcion / 100;
            const energiaKcalIngPorcion = energiaKcalIng100ml * factorIngrediente;
            const energiaKjIngPorcion = energiaKjIng100ml * factorIngrediente;
            const proteinaGIngPorcion = proteinaGIng100ml * factorIngrediente;
            const grasasTotalesGIngPorcion = grasasTotalesGIng100ml * factorIngrediente;
            const grasasSaturadasGIngPorcion = grasasSaturadasGIng100ml * factorIngrediente;
            const grasasTransGIngPorcion = grasasTransGIng100ml * factorIngrediente;
            const hidratosCarbonoGIngPorcion = hidratosCarbonoGIng100ml * factorIngrediente;
            const azucaresGIngPorcion = azucaresGIng100ml * factorIngrediente;
            const azucaresAniadidosGIngPorcion = azucaresAniadidosGIng100ml * factorIngrediente;
            const fibraGIngPorcion = fibraGIng100ml * factorIngrediente;
            const sodioMgIngPorcion = sodioMgIng100ml * factorIngrediente;

            const porcionPreparada = {
                energiaKcal: energiaKcalBasePorcion + energiaKcalIngPorcion,
                energiaKj: energiaKjBasePorcion + energiaKjIngPorcion,
                proteinaG: proteinaGBasePorcion + proteinaGIngPorcion,
                grasasTotalesG: grasasTotalesGBasePorcion + grasasTotalesGIngPorcion,
                grasasSaturadasG: grasasSaturadasGBasePorcion + grasasSaturadasGIngPorcion,
                grasasTransG: grasasTransGBasePorcion + grasasTransGIngPorcion,
                hidratosCarbonoG: hidratosCarbonoGBasePorcion + hidratosCarbonoGIngPorcion,
                azucaresG: azucaresGBasePorcion + azucaresGIngPorcion,
                azucaresAniadidosG: azucaresAniadidosGBasePorcion + azucaresAniadidosGIngPorcion,
                fibraG: fibraGBasePorcion + fibraGIngPorcion,
                sodioMg: sodioMgBasePorcion + sodioMgIngPorcion,
            };

            // --- Cálculo por 100 ml de producto preparado ---
            // Se suma peso del polvo (g) + volumen líquido (ml) asumiendo densidad 1g/ml
            const volumenTotalPreparadoAprox = pesoProductoBaseEnPorcion + porcionFinalMlEncase; // ej. 90 + 350 = 440 ml
            const factor100ml = 100 / volumenTotalPreparadoAprox;

            const por100ml = {
                energiaKcal: porcionPreparada.energiaKcal * factor100ml,
                energiaKj: porcionPreparada.energiaKj * factor100ml,
                proteinaG: porcionPreparada.proteinaG * factor100ml,
                grasasTotalesG: porcionPreparada.grasasTotalesG * factor100ml,
                grasasSaturadasG: porcionPreparada.grasasSaturadasG * factor100ml,
                grasasTransG: porcionPreparada.grasasTransG * factor100ml,
                hidratosCarbonoG: porcionPreparada.hidratosCarbonoG * factor100ml,
                azucaresG: porcionPreparada.azucaresG * factor100ml,
                azucaresAniadidosG: porcionPreparada.azucaresAniadidosG * factor100ml,
                fibraG: porcionPreparada.fibraG * factor100ml,
                sodioMg: porcionPreparada.sodioMg * factor100ml,
            };



            // --- Cálculo contenido energético total por envase ---
            const porEnvase = {
                energiaKcal: porcionPreparada.energiaKcal * porcionesPorEnvase,
                energiaKj: porcionPreparada.energiaKj * porcionesPorEnvase,
            };


            const producto = dataForm.productoBase;
            console.log(producto);

            const datosDelProducto = {
                energiaKcal: por100ml.energiaKcal,
                grasasSaturadasG: por100ml.grasasSaturadasG,
                grasasTransG: por100ml.grasasTransG,
                azucaresG: por100ml.azucaresG,
                sodioMg: por100ml.sodioMg,
                sodioMgMenor45: productoBase.sodioMg,
            };

            const resultado = await evaluarSellosNOM051(datosDelProducto);

            const exSodio = resultado.valoresCalculados.sodioMg
                ? resultado.valoresCalculados.sodioMg.toFixed(2)
                : 0;

            const exSodio2 = resultado.valoresCalculados.sodioPorKcal
                ? resultado.valoresCalculados.sodioPorKcal.toFixed(2) : 0;

            console.log("Resultado sodio: " + exSodio);
            console.log("Resultado de sodio 2: " + exSodio2);

            const data = {
                pp: producto.pesoPorcionBaseG,
                folio: producto.folioBusqueda,
                producto: producto.muestraDescripcion,
                CEKC: producto.energiaKcal,
                CEKJ: producto.energiaKj,
                PR: producto.proteinaG,
                GT: producto.grasasTotalesG,
                GS: producto.grasasSaturadasG,
                GTR: producto.grasasTransG,
                HDC: producto.hidratosCarbonoG,
                AZ: producto.azucaresG,
                AZA: producto.azucaresAniadidosG,
                FBD: producto.fibraG,
                SO: producto.sodioMg,
                fecha: fechaCreacion,
                analista: producto.analista,
                CEKCT: Number(((producto.energiaKcal * producto.contenidoNeto) / producto.pesoPorcionBaseG).toFixed(2)),
                CEKJT: Number(((producto.energiaKj * producto.contenidoNeto) / producto.pesoPorcionBaseG).toFixed(2)),
                CNT: producto.contenidoNeto,
                preparacion: productoBase.preparacion,

                // Columna "Por 100 ml de producto preparado"
                CEKC_100ml: por100ml.energiaKcal.toFixed(2),
                CEKJ_100ml: por100ml.energiaKj.toFixed(2),
                PR_100ml: por100ml.proteinaG.toFixed(2),
                GT_100ml: por100ml.grasasTotalesG.toFixed(2),
                GS_100ml: por100ml.grasasSaturadasG.toFixed(2),
                GTR_100ml: por100ml.grasasTransG.toFixed(2),
                HDC_100ml: por100ml.hidratosCarbonoG.toFixed(2),
                AZ_100ml: por100ml.azucaresG.toFixed(2),
                AZA_100ml: por100ml.azucaresAniadidosG.toFixed(2),
                FBD_100ml: por100ml.fibraG.toFixed(2),
                SO_100ml: por100ml.sodioMg.toFixed(2),

                // Columna "Por porción preparada"
                CEKC_porcion: porcionPreparada.energiaKcal.toFixed(2),
                CEKJ_porcion: porcionPreparada.energiaKj.toFixed(2),
                PR_porcion: porcionPreparada.proteinaG.toFixed(2),
                GT_porcion: porcionPreparada.grasasTotalesG.toFixed(2),
                GS_porcion: porcionPreparada.grasasSaturadasG.toFixed(2),
                GTR_porcion: porcionPreparada.grasasTransG.toFixed(2),
                HDC_porcion: porcionPreparada.hidratosCarbonoG.toFixed(2),
                AZ_porcion: porcionPreparada.azucaresG.toFixed(2),
                AZA_porcion: porcionPreparada.azucaresAniadidosG.toFixed(2),
                FBD_porcion: porcionPreparada.fibraG.toFixed(2),
                SO_porcion: porcionPreparada.sodioMg.toFixed(2),

                CEKCTEV: porEnvase.energiaKcal.toFixed(2),
                CEKJTEV: porEnvase.energiaKj.toFixed(2),

                exAzucaresLibres: resultado.valoresCalculados.porcentajeAzucaresLibres.toFixed(2),
                exAzucares: resultado.valoresCalculados.porcentajeAzucares.toFixed(2),
                exGrasasS: resultado.valoresCalculados.porcentajeGrasasSaturadas.toFixed(2),
                exGrasasT: resultado.valoresCalculados.porcentajeGrasasTrans.toFixed(2),
                exSodio: exSodio,
                exSodio2: exSodio2,
                sellosExcesoCalorias: resultado.sellos.excesoCalorias ? 'Aplica' : 'No aplica',
                sellosExcesoCalorias: resultado.sellos.excesoCalorias ? 'Aplica' : 'No aplica',
                sellosExcesoAzucares: resultado.sellos.excesoAzucares ? 'Aplica' : 'No aplica',
                sellosExcesoGrasasSaturadas: resultado.sellos.excesoGrasasSaturadas ? 'Aplica' : 'No aplica',
                sellosExcesoGrasasTrans: resultado.sellos.excesoGrasasTrans ? 'Aplica' : 'No aplica',
                sellosExcesoSodio: resultado.sellos.excesoSodio ? 'Aplica' : 'No aplica',
                sellosExcesoSodio2: resultado.valoresCalculados.sodioMg >= 300 ? 'Aplica' : resultado.valoresCalculados.sodioMg >= 45 ? 'Aplica' : 'No aplica',
                excesoCA: resultado.sellos.excesoCalorias ? 'Sí' : 'No',
                excesoSO: resultado.sellos.excesoSodio ? 'Sí' : 'No',
                excesoGT: resultado.sellos.excesoGrasasTrans ? 'Sí' : 'No',
                excesoAZ: resultado.sellos.excesoAzucares ? 'Sí' : 'No',
                excesoGS: resultado.sellos.excesoGrasasSaturadas ? 'Sí' : 'No',
                contenidoNeto: productoBase.contenidoNeto,
            };

            try {
                const infoPrep = await NutrimentalModel.saveDeclaration(data, productoBase.idMuestra);

                if (!infoPrep || !infoPrep.id_preparacion) {
                    throw new Error('Error al guardar en informacion_preparacion. No se obtuvo id_preparacion.');
                }

                const idPreparacion = infoPrep.id_preparacion;
                const nombreArchivo = generarNombreArchivo(productoBase);

                const docGen = await NutrimentalModel.saveDocumentoGenerado(idPreparacion, nombreArchivo);

                if (!docGen || !docGen.id_declaracion_nutrimental) {
                    throw new Error('Error al guardar en documentos_generados. No se obtuvo id_declaracion_nutrimental.');
                }


                const docxBuffer = generateWordFromTemplate(data);

                return res
                    .status(200)
                    .set({
                        "Content-Type":
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "Content-Disposition": 'attachment; filename="reporte.docx"',
                    })
                    .send(docxBuffer);
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: error.message });
            }
        } catch (error) {
            console.error("❌ Error al generar el informe nutrimental:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error al generar el reporte Word.",
                error: error.message,
            });
        }
    }
}


function generarNombreArchivo(productoBase) {
    const { muestraDescripcion, folioBusqueda } = productoBase;
    const fecha = new Date();
    const timestamp = fecha.toISOString().replace(/[:.]/g, '-'); // formato seguro para archivos

    const nombreSanitizado = muestraDescripcion.replace(/\s+/g, '_').toUpperCase();

    return `Contenido_Nutrimental_${nombreSanitizado}_${folioBusqueda}_${timestamp}`;
}

/**
 * Evalúa si un producto líquido debe llevar sellos de advertencia 
 * y retorna los valores calculados junto a los sellos aplicables.
 * @param {object} datosNutricionales - Objeto con los valores por 100 ml del producto.
 * @returns {object} Un objeto que contiene los sellos y los valores calculados.
 */
function evaluarSellosNOM051(datosNutricionales) {
    // Factores de Atwater
    const factorCarbohidratos = 4;
    const factorGrasas = 9;

    // Umbrales de la NOM-051 para productos líquidos (por 100 ml)
    const umbrales = {
        energiaKcal: 70,
        porcentajeAzucares: 10,
        porcentajeGrasasSaturadas: 10,
        porcentajeGrasasTrans: 1,
        sodioMg: 45,
    };

    const azucares = datosNutricionales.azucaresG * factorCarbohidratos;

    // Cálculo de sodio
    let sodioTotal = datosNutricionales.sodioMg;
    let sodioPorKcal = 0;

    if (datosNutricionales.energiaKcal > 0) {
        sodioPorKcal = sodioTotal / datosNutricionales.energiaKcal;
    }

    // 1. Cálculos de porcentajes y valores directos
    const valoresCalculados = {
        porcentajeAzucaresLibres: azucares,
        porcentajeAzucares: (azucares / datosNutricionales.energiaKcal) * 100,
        porcentajeGrasasSaturadas: ((datosNutricionales.grasasSaturadasG * factorGrasas) / datosNutricionales.energiaKcal) * 100,
        porcentajeGrasasTrans: ((datosNutricionales.grasasTransG * factorGrasas) / datosNutricionales.energiaKcal) * 100,
        sodioMg: sodioTotal,
        sodioPorKcal: sodioPorKcal
    };

    // 2. Evaluación de los sellos
    const sellos = {
        excesoCalorias: datosNutricionales.energiaKcal >= umbrales.energiaKcal,
        excesoAzucares: valoresCalculados.porcentajeAzucares >= umbrales.porcentajeAzucares,
        excesoGrasasSaturadas: valoresCalculados.porcentajeGrasasSaturadas >= umbrales.porcentajeGrasasSaturadas,
        excesoGrasasTrans: valoresCalculados.porcentajeGrasasTrans >= umbrales.porcentajeGrasasTrans,
        excesoSodio: (
            valoresCalculados.sodioMg >= 300 ||
            valoresCalculados.sodioMg >= 45 && valoresCalculados.sodioPorKcal >= 1
        )
    };

    return { sellos, valoresCalculados };
}

export default NutrimentalController;

