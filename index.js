const Config = require('./dist/config');
const minimist = require('minimist');
const cluster = require('cluster');
const os = require('os');
const Server = require('./dist/services/server');
const { initDB } = require('./dist/services/database');
const { logger } = require('./dist/utils/logger');

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
