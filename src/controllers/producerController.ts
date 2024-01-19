import { Request, Response } from "express";
import { producerService } from "../services/producerService";

/**
 * @swagger
 * tags:
 *   name: Fazendas
 *   description: Operações relacionadas a fazendas
 */
export class ProducerController {

/**
 * @swagger
 * /producers:
 *   get:
 *     summary: Retorna todas as fazendas
 *     tags: [Fazendas]
 *     responses:
 *       '200':
 *         description: Lista de fazendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fazenda'
 */
  async getAll(req: Request, res: Response) {
    try {
      const producers = await producerService.getAll();
      res.json(producers);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
/**
 * @swagger
 * /producers/:id:
 *   get:
 *     summary: Retorna uma fazendo pelo id
 *     tags: [Fazendas]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID da fazenda a ser recuperada
 *        schema:
 *          type: integer
 *     responses:
 *       '400':
 *         description: id inválido
 *       '200':
 *         description: Uma fazenda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fazenda'
 *                
 */
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const producer = await producerService.getById(id);
      res.json(producer);
    } catch (error: any) {
      res.status(error?.status || 500).json(error.message);
    }
  }

/**
 * @swagger
 * /producers:
 *   post:
 *     summary: Cria uma fazenda
 *     tags: [Fazendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FazendaInput'
 *     responses:
 *       '500':
 *         description: Erro interno
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Fazenda criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fazenda'
 *                
 */
  async create(req: Request, res: Response) {
    try {
      const producer = req.body;
      const newProducer = await producerService.create(producer);
      res.json(newProducer);
    } catch (error: any) {
      console.log(error)
      res.status(error?.status|| 500).json(error.message);
    }
  }

/**
 * @swagger
 * /producers/:id:
 *   put:
 *     summary: Atualiza uma fazendo pelo id
 *     tags: [Fazendas]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID da fazenda a ser recuperada
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FazendaInput'
 *     responses:
 *       '500':
 *         description: Erro interno
 *       '400':
 *         description: id inválido
 *       '200':
 *         description: Uma fazenda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fazenda'
 *                
 */
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const producer = req.body;
      const updatedProducer = await producerService.update(id, producer);
      res.json(updatedProducer);
    } catch (error: any) {
      res.status(error?.status || 500).json(error.message);
    }
  }

/**
 * @swagger
 * /producers/:id:
 *   delete:
 *     summary: Deleta uma fazendo pelo id
 *     tags: [Fazendas]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID da fazenda a ser recuperada
 *        schema:
 *          type: integer
 *     responses:
 *       '400':
 *         description: id inválido
 *       '500':
 *         description: Erro interno
 *       '200':
 *         description: Fazenda deletada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fazenda'
 *                
 */
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletedProducer = await producerService.delete(id);
      res.json(deletedProducer);
    } catch (error: any) {
      res.status(error?.status || 500).json(error.message);
    }
  }

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna informações para o dashboard
 *     tags: [Fazendas]
 *     responses:
 *       '500':
 *         description: Erro interno
 *       '200':
 *         description: Métricas para o dashboard
 *         content:
 *           application/json:
 *            example:
 *               totalFarmers: 6
 *               totalFarmerPerState:
 *                 - _count: 2
 *                   state: "MG"
 *                 - _count: 1
 *                   state: "SP"
 *                 - _count: 1
 *                   state: "BA"
 *                 - _count: 1
 *                   state: "PR"
 *                 - _count: 1
 *                   state: "PA"
 *               totalArea: 7750
 *               totalAreaHarvested: 1330
 *               totalAreaPlanted: 5670
 *               totalArePerState:
 *                 - _sum:
 *                     totalArea: 1200
 *                   state: "MG"
 *                 - _sum:
 *                     totalArea: 100
 *                   state: "SP"
 *                 - _sum:
 *                     totalArea: 5000
 *                   state: "BA"
 *                 - _sum:
 *                     totalArea: 450
 *                   state: "PR"
 *                 - _sum:
 *                     totalArea: 1000
 *                   state: "PA"
 *               areaPerState:
 *                 MG: 0.15483870967741936
 *                 SP: 0.012903225806451613
 *                 BA: 0.6451612903225806
 *                 PR: 0.05806451612903226
 *                 PA: 0.12903225806451613
 *               totalAreaPerCulture:
 *                 - _sum:
 *                     totalArea: 5100
 *                   culture:
 *                     - "Soja"
 *                 - _sum:
 *                     totalArea: 1100
 *                   culture:
 *                     - "Café"
 *                     - "Algodão"
 *                 - _sum:
 *                     totalArea: 100
 *                   culture:
 *                     - "Café"
 *                 - _sum:
 *                     totalArea: 1000
 *                   culture:
 *                     - "Café"
 *                     - "Milho"
 *                 - _sum:
 *                     totalArea: 450
 *                   culture:
 *                     - "Cana de Açúcar"
 *               areaUsage:
 *                 used: 7000
 *                 total: 7750
 * 
 */
  async dashboard(req: Request, res: Response) {
    try {
      const dashboard = await producerService.dashboard();
      res.json(dashboard);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
