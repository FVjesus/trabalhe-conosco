import express from 'express';
import { ProducerController } from '../controllers/producerController';

const router = express.Router();
const producerController = new ProducerController();

router.get("/producers", producerController.getAll);
router.get("/producers/:id", producerController.getById);
router.post("/producers", producerController.create);
router.put("/producers", producerController.update);
router.delete("/producers/:id", producerController.delete);
router.get("/dashboard", producerController.dashboard);

export { router };