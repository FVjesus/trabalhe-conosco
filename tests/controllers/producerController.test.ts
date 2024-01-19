import { Request, Response } from "express";
import { producerService } from "../../src/services/producerService";
import { ProducerController } from "../../src/controllers/producerController";

jest.mock("../../src/services/producerService");
const producerServiceMock = producerService as jest.Mocked<
  typeof producerService
>;

describe("ProducerController", () => {
  let producerController: ProducerController;
  let req: Request;
  let res: Response;
  const producerMock = {
    id: 1,
    document: "04095791063",
    producerName: "Trajano",
    farmName: "Fazenda Trajano",
    city: "Sete Lagoas",
    state: "MG",
    totalArea: 100,
    areaPlanted: 50,
    areaHarvested: 50,
    culture: ["Soja"],
  };

  beforeEach(() => {
    producerController = new ProducerController();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  describe("getAll", () => {
    it("should return a list of producers", async () => {
      producerServiceMock.getAll.mockResolvedValue([producerMock]);

      await producerController.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith([producerMock]);
    });
  });

  it("should return a producer by id", async () => {
    req.params = { id: "1" };
    producerServiceMock.getById.mockResolvedValue(producerMock);

    await producerController.getById(req, res);

    expect(res.json).toHaveBeenCalledWith(producerMock);
  });

  it("should create a producer", async () => {
    req.body = producerMock;
    producerServiceMock.create.mockResolvedValue(producerMock);

    await producerController.create(req, res);

    expect(res.json).toHaveBeenCalledWith(producerMock);
  });

  it("should update a producer", async () => {
    req.params = { id: "1" };
    req.body = producerMock;
    producerServiceMock.update.mockResolvedValue(producerMock);

    await producerController.update(req, res);

    expect(res.json).toHaveBeenCalledWith(producerMock);
  });

  it("should delete a producer", async () => {
    req.params = { id: "1" };
    producerServiceMock.delete.mockResolvedValue(producerMock);

    await producerController.delete(req, res);

    expect(res.json).toHaveBeenCalledWith(producerMock);
  });

  it("should return a dashboard", async () => {
    producerServiceMock.dashboard.mockResolvedValue({
      totalArea: 100,
      areaPlanted: 50,
      areaHarvested: 50,
      culture: ["Soja"],
    });

    await producerController.dashboard(req, res);

    expect(res.json).toHaveBeenCalledWith({
      totalArea: 100,
      areaPlanted: 50,
      areaHarvested: 50,
      culture: ["Soja"],
    });
  });
});
