import Config from './config';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import Server from './services/server';
import { initDB } from './services/database';
import { logger } from './utils/logger';

const argumentos = minimist(process.argv.slice(2));

const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;

initDB();

/* --------------------------------------------------------------------------- */
/* MASTER */
/**
 * isMaster vs isPrimary
 * https://stackoverflow.com/questions/68978929/why-is-nodejs-cluster-module-not-working
 */
if (clusterMode && cluster.isMaster) {
  logger.info('Ejecutando modo cluster');
  logger.info(`PID MASTER ${process.pid}, numeros de cpu ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  /* --------------------------------------------------------------------------- */
  /* WORKERS */
  Server.listen(Config.PORT, () =>
    logger.info(
      `Servidor express escuchando en el puerto ${Config.PORT} - PID WORKER ${process.pid}`
    )
  );
}
