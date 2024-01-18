import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const producers = [
    {
      document: "87120490001",
      producerName: "José Emanuel",
      farmName: "Fazenda São José",
      city: 'São José dos Campos',
      state: 'SP',
      totalArea: 100,
      areaPlanted: 50,
      areaHarvested: 50,
      culture: ['Café'],
    },
    {
      document: "38201936000153",
      producerName: "Alcides",
      farmName: "Fazenda Canaã",
      city: 'Canaã dos Carajás',
      state: 'PA',
      totalArea: 1000,
      areaPlanted: 670,
      areaHarvested: 330,
      culture: ['Café', 'Milho'],
    },
    {
      document: "73777219000175",
      producerName: "Damião",
      farmName: "Fazenda Mãe Rainha",
      city: 'Araguari',
      state: 'MG',
      totalArea: 1100,
      areaPlanted: 500,
      areaHarvested: 600,
      culture: ['Café', 'Algodão'],
    },
    {
      document: "36937495072",
      producerName: "Thiago",
      farmName: "Fazenda Terra Prometida",
      city: 'Terra Rica',
      state: 'PR',
      totalArea: 450,
      areaPlanted: 400,
      areaHarvested: 50,
      culture: ['Cana de Açúcar'],
    },
    {
      document: "04095791063",
      producerName: "Trajano",
      farmName: "Fazenda Trajano",
      city: 'Sete Lagoas',
      state: 'MG',
      totalArea: 100,
      areaPlanted: 50,
      areaHarvested: 50,
      culture: ['Soja'],
    }
  ];

  for (const producer of producers) {
    await prisma.producer.create({
      data: producer,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })