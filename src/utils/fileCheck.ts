import fs from 'fs/promises';
import { IDBdata } from '../Interfaces/interfaces';

export const checkDbExist = (path: string) => {
  fs.access(path).catch((err) => {
    fileCreation(path);
  });
};

export const fileCreation = async (path: string) => {
  try {
    const data = {
      productos: [],
      carritos: [
        {
          id: 0,
          timestamp: Date.now().toString(),
          productos: [],
        },
        {
          id: 1,
          timestamp: Date.now().toString(),
          productos: [],
        },
        {
          id: 2,
          timestamp: Date.now().toString(),
          productos: [],
        },
        {
          id: 3,
          timestamp: Date.now().toString(),
          productos: [],
        },
      ],
    };
    await fs.writeFile(path, JSON.stringify(data));
  } catch (error) {
    console.log('ERROR_FILE_CREATION', error);
  }
};

export const getDbData = async (PATH: string): Promise<IDBdata | null> => {
  try {
    const db = await fs.readFile(PATH, 'utf-8');
    const data = JSON.parse(db);
    return data;
  } catch (error) {
    return null;
  }
};

export const writeDbData = async (path: string, data: IDBdata) => {
  try {
    const stringData = JSON.stringify(data);
    await fs.writeFile(path, stringData);
    return true;
  } catch (error) {
    return false;
  }
};
