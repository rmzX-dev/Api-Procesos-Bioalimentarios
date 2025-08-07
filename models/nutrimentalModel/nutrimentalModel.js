import db from "../../config/db.js";
import Folav from "../folavModel/folavModel.js";
import pool from "../../config/db.js";

class NutrimentalModel {
  static async saveDeclaration(data, idMuestra) {
    const sql = `
    INSERT INTO informacion_preparacion (
      idmuestra, preparacion,
      cekc_100ml, cekj_100ml, pr_100ml, gt_100ml, gs_100ml, gtr_100ml, hdc_100ml, az_100ml, aza_100ml, fbd_100ml, so_100ml,
      cekc_porcion, cekj_porcion, pr_porcion, gt_porcion, gs_porcion, gtr_porcion, hdc_porcion, az_porcion, aza_porcion, fbd_porcion, so_porcion,
      cekctev, cekjtev,
      ex_azucares_libres, ex_azucares, ex_grasas_s, ex_grasas_t, ex_sodio, ex_sodio2,
      sellos_exceso_calorias, sellos_exceso_azucares, sellos_exceso_grasas_saturadas, sellos_exceso_grasas_trans, sellos_exceso_sodio, sellos_exceso_sodio2,
      exceso_ca, exceso_so, exceso_gt, exceso_az, exceso_gs,
      contenido_neto
    )
    VALUES (
      $1, $2,
      $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
      $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
      $25, $26,
      $27, $28, $29, $30, $31, $32,
      $33, $34, $35, $36, $37, $38,
      $39, $40, $41, $42, $43,
      $44
    )
    RETURNING id_preparacion
  `;

    const values = [
      idMuestra,
      data.preparacion,

      // Por 100 ml
      data.CEKC_100ml, data.CEKJ_100ml, data.PR_100ml, data.GT_100ml, data.GS_100ml,
      data.GTR_100ml, data.HDC_100ml, data.AZ_100ml, data.AZA_100ml, data.FBD_100ml, data.SO_100ml,

      // Por porción
      data.CEKC_porcion, data.CEKJ_porcion, data.PR_porcion, data.GT_porcion, data.GS_porcion,
      data.GTR_porcion, data.HDC_porcion, data.AZ_porcion, data.AZA_porcion, data.FBD_porcion, data.SO_porcion,

      // Por envase
      data.CEKCTEV, data.CEKJTEV,

      // Valores calculados
      data.exAzucaresLibres, data.exAzucares, data.exGrasasS, data.exGrasasT, data.exSodio, data.exSodio2,

      // Sellos
      data.sellosExcesoCalorias, data.sellosExcesoAzucares, data.sellosExcesoGrasasSaturadas,
      data.sellosExcesoGrasasTrans, data.sellosExcesoSodio, data.sellosExcesoSodio2,

      // Banderas
      data.excesoCA, data.excesoSO, data.excesoGT, data.excesoAZ, data.excesoGS,

      // Extra
      data.contenidoNeto
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async saveDocumentoGenerado(idPreparacion, nombreArchivo) {
    const sql = `
    INSERT INTO documentos_generados (
      id_preparacion,
      nombre_archivo
    ) VALUES ($1, $2)
    RETURNING id_declaracion_nutrimental
  `;

    const values = [idPreparacion, nombreArchivo];
    const result = await db.query(sql, values);
    return result.rows[0]; // Devuelve { id_declaracion_nutrimental: X }
  }

  static async getAllDocumentosGenerados() {
  const sql = `
    SELECT *
    FROM documentos_generados
    WHERE eliminado = FALSE
  `;

  const result = await db.query(sql);
  return result.rows; // Devuelve un array con los documentos no eliminados
}

 static async deleteNutrimentalDoc(idDocumento) {
    const result = await pool.query(
      'UPDATE documentos_generados SET eliminado = TRUE WHERE id_declaracion_nutrimental = $1 RETURNING *',
      [idDocumento]
    );
    return result.rows[0];
  }

static async getInfoDocumentos(nombreArchivo){

  const sql = `
     SELECT 
  -- Campos de documentos_generados
  dg.id_declaracion_nutrimental,
  dg.id_preparacion,
  dg.nombre_archivo,
  dg.fecha_generado,
  dg.eliminado,

  -- Campos seleccionados de informacion_preparacion (excepto id_preparacion)
  ip.idmuestra,
  ip.preparacion,
  ip.cekc_100ml, ip.cekj_100ml, ip.pr_100ml, ip.gt_100ml, ip.gs_100ml, ip.gtr_100ml, ip.hdc_100ml,
  ip.az_100ml, ip.aza_100ml, ip.fbd_100ml, ip.so_100ml,
  
  ip.cekc_porcion, ip.cekj_porcion, ip.pr_porcion, ip.gt_porcion, ip.gs_porcion, ip.gtr_porcion, ip.hdc_porcion,
  ip.az_porcion, ip.aza_porcion, ip.fbd_porcion, ip.so_porcion,

  ip.cekctev, ip.cekjtev,

  ip.ex_azucares_libres, ip.ex_azucares, ip.ex_grasas_s, ip.ex_grasas_t, ip.ex_sodio, ip.ex_sodio2,

  ip.sellos_exceso_calorias, ip.sellos_exceso_azucares, ip.sellos_exceso_grasas_saturadas,
  ip.sellos_exceso_grasas_trans, ip.sellos_exceso_sodio, ip.sellos_exceso_sodio2,

  ip.exceso_ca, ip.exceso_so, ip.exceso_gt, ip.exceso_az, ip.exceso_gs,

  ip.contenido_neto

FROM documentos_generados dg
INNER JOIN informacion_preparacion ip 
  ON dg.id_preparacion = ip.id_preparacion
WHERE dg.nombre_archivo = $1
  AND dg.eliminado = FALSE;
  `;

  const values = [nombreArchivo];
  const result = await db.query(sql, values);
  return result.rows[0]; // Devuelve { id_declaracion_nutrimental: X }
}

}

export default NutrimentalModel;