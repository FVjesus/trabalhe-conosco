import { Producer } from "../models/producer";
import { ProducerRepository } from "../repositories/producerRepository";
import { ProducerValidation } from "../validations/producerValidation";
class ProducerService {
  private producerRepository: ProducerRepository;

  constructor() {
    this.producerRepository = new ProducerRepository();
  }

  async getAll(): Promise<Producer[]> {
    const producers = await this.producerRepository.getAll();
    return producers;
  }

  async getById(id: number): Promise<Producer | null> {
    const producer = await this.producerRepository.getById(id);
    return producer;
  }

  async create(producer: Producer): Promise<Producer> {
    ProducerValidation.validateProducer(producer);
    const newProducer = await this.producerRepository.create(producer);
    return newProducer;
  }

  async update(producer: Producer): Promise<Producer> {
    ProducerValidation.validateProducer(producer);
    const updatedProducer = await this.producerRepository.update(producer);
    return updatedProducer;
  }

  async delete(id: number): Promise<Producer> {
    const deletedProducer = await this.producerRepository.delete(id);
    return deletedProducer;
  }
}

const producerService = new ProducerService();
export { producerService };
