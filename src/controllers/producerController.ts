import { Request, Response } from "express";
import { producerService } from "../services/producerService";

export class ProducerController {
  async getAll(req: Request, res: Response) {
    try {
      const producers = await producerService.getAll();
      res.json(producers);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const producer = await producerService.getById(id);
      res.json(producer);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const producer = req.body;
      const newProducer = await producerService.create(producer);
      res.json(newProducer);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const producer = req.body;
      const updatedProducer = await producerService.update(producer);
      res.json(updatedProducer);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletedProducer = await producerService.delete(id);
      res.json(deletedProducer);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
