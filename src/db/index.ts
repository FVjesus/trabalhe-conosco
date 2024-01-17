import {IMain, IDatabase } from 'pg-promise';
import pgPromise from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

const pgp: IMain = pgPromise({});
const dbConfig: IConnectionParameters = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5434,
  database: 'node_crud_db',
};

const db: IDatabase<{}> = pgp(dbConfig);

export { db };