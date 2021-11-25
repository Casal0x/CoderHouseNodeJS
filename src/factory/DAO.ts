import Config from '../config';

class Factory {
  private instance: any;

  constructor(type: string) {
    this.setInstance(type);
  }

  getInstance() {
    return this.instance;
  }

  setInstance(type: string) {
    switch (type) {
      case 'fs':
        this.instance = 'fs';
        break;
      case 'mongo-local':
        this.instance = 'mongo-local';
      default:
        this.instance = 'mongo-atlas';
        break;
    }
  }
}

export const FactoryInstance = new Factory(Config.DB_TYPE);
