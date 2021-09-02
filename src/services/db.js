import knex from 'knex';
import dbConfig from '../../knexfile';

class DB {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('mensajes').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla mensajes!');

      return this.connection.schema.createTable('mensajes', (mensajesTable) => {
        mensajesTable.increments();
        mensajesTable.string('email').notNullable();
        mensajesTable.string('text').notNullable();
        mensajesTable.timestamp('time').notNullable();
      });
    });
  }

  get(tableName, id) {
    if (id) return this.connection(tableName).where('id', id);

    return this.connection(tableName);
  }

  async create(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  update(tableName, id, data) {
    return this.connection(tableName).where('id', id).update(data);
  }

  delete(tableName, id) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const DBService = new DB();
