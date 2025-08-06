import db from "../../config/db.js";

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

}

export default NutrimentalModel;