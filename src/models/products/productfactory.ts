import { ProductDAOMEM } from './DAO/memoria';
import { ProductDAOFS } from './DAO/fs';
import { ProductDAOSQL } from './DAO/sql';
import { ProductDAOMONGO } from './DAO/mongodb';
import { ProductDAOFirebase } from './DAO/firebase';

export class FactoryDAO {
  static get(type: number) {
    switch (type) {
      case 1:
        return new ProductDAOFS();
      case 2:
        return new ProductDAOSQL(true);
      case 3:
        return new ProductDAOSQL(false);
      case 4:
        return new ProductDAOMONGO(true);
      case 5:
        return new ProductDAOMONGO(false);
      case 6:
        return new ProductDAOFirebase();
      case 0:
      default:
        return new ProductDAOMEM();
    }
  }
}
