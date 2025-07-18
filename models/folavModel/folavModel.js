import pool from "../../config/db.js";

class Folav {
  static async createFolav(data) {
    const { idAnalisis, fechaGeneracion } = data;

    const result = await pool.query(
      `INSERT INTO folav (idAnalisis, fechaGeneracion)
             VALUES ($1, $2) RETURNING *`,
      [idAnalisis, fechaGeneracion]
    );

    return result.rows[0];
  }


  static async getFolavs() {
    const result = await pool.query(`
        SELECT 
            f.idHistorial,
            f.idAnalisis,
            CONCAT('FOLAB-', a.folio) AS folio,
            c.razonSocial AS cliente,
            f.fechaGeneracion,
            m.descripcion AS muestra
        FROM folav f
        JOIN analisis a ON f.idAnalisis = a.idAnalisis
        JOIN muestra m ON a.idMuestra = m.idMuestra
        JOIN clientes c ON m.idCliente = c.idCliente
        WHERE f.eliminado = FALSE
        ORDER BY f.fechaGeneracion DESC;
    `);
    return result.rows;
  }


  /**
  * Trae un análisis con TODOS los datos relacionados, por idAnalisis
  * @param {number} idAnalisis
  * @returns {object|null}
  */
  static async findFolavById(idAnalisis) {
    const result = await pool.query(
      `SELECT
    a.*,
    m.descripcion AS muestra_descripcion,
    c.razonSocial AS cliente_razon_social,
	c.direccion AS cliente_direccion,
    ah.resultado AS humedad_resultado,
    ah.acreditacion AS humedad_acreditacion,
    ap.resultado AS proteinas_resultado,
    ap.acreditacion AS proteinas_acreditacion,
    ac.resultado AS cenizas_resultado,
    ac.acreditacion AS cenizas_acreditacion,
    afd.resultado AS fibra_resultado,
    afd.acreditacion AS fibra_acreditacion,
    acr.resultado AS carbohidratos_resultado,
    acr.acreditacion AS carbohidratos_acreditacion,
    asd.resultado AS sodio_resultado,
    asd.acreditacion AS sodio_acreditacion,
    aen.resultadoKcal AS energetico_kcal,
    aen.resultadoKj AS energetico_kj,
    aen.acreditacion AS energetico_acreditacion,
    aag.resultadoTrans AS grasas_trans,
    aag.resultadoSaturadas AS grasas_saturadas,
    aag.resultadoMonoinsaturados AS grasas_monoinsaturadas,
    aag.resultadoPolyinsaturados AS grasas_polyinsaturadas,
    aag.total AS grasas_total,
    aag.acreditacion AS grasas_acreditacion,
    f.idHistorial,
    f.fechaGeneracion AS folav_fecha
FROM analisis a
JOIN muestra m ON m.idMuestra = a.idMuestra
JOIN clientes c ON c.idCliente = m.idCliente

LEFT JOIN analisishumedad ah ON ah.idAnalisis = a.idAnalisis
LEFT JOIN analisisproteinas ap ON ap.idAnalisis = a.idAnalisis
LEFT JOIN analisiscenizas ac ON ac.idAnalisis = a.idAnalisis
LEFT JOIN analisisfibradietetica afd ON afd.idAnalisis = a.idAnalisis
LEFT JOIN analisiscarbohidratos acr ON acr.idAnalisis = a.idAnalisis
LEFT JOIN analisissodio asd ON asd.idAnalisis = a.idAnalisis
LEFT JOIN analisisenergetico aen ON aen.idAnalisis = a.idAnalisis
LEFT JOIN analisisacidosgrasos aag ON aag.idAnalisis = a.idAnalisis

LEFT JOIN folav f ON f.idAnalisis = a.idAnalisis

WHERE a.idAnalisis = $1;`,
      [idAnalisis]
    );

    // Si no encuentra nada devuelve null
    return result.rows.length ? result.rows[0] : null;
  }


  static async deleteFolav(idFolab) {
    const result = await pool.query(
      'UPDATE folav SET eliminado = TRUE WHERE idHistorial = $1 RETURNING *',
      [idFolab]
    );
    return result.rows[0];
  }
}

export default Folav;