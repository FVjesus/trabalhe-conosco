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

export type { Producer } 