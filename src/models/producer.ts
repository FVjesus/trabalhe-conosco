
/**
 * @swagger
 * components:
 *   schemas:
 *     Fazenda:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da fazenda
 *         document:
 *           type: string
 *           description: Cpf ou Cnpj do produtor
 *         producerName:
 *           type: string
 *           description: Nome do produtor
 *         farmName:
 *           type: string
 *           description: Nome da fazenda
 *         city:
 *           type: string
 *           description: Cidade da fazenda
 *         state:
 *           type: string
 *           description: Estado da fazenda
 *         totalArea:
 *           type: number
 *           description: Área total da fazenda
 *         areaPlanted:
 *           type: number
 *           description: Área plantada da fazenda
 *         areaHarvested:
 *           type: number
 *           description: Área de vegetação da fazenda
 *         culture:
 *           type: array
 *           items:
 *             type: string
 *           description: Tipos de culturas na fazenda
 */


interface Producer {
  id: number;
  document: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  areaPlanted: number;
  areaHarvested: number;
  culture: string[];
}

export type { Producer };
