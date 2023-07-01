import * as _cluster from 'cluster'; // typings fix
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const cluster = _cluster as unknown as _cluster.Cluster;

const numCPUs = os.cpus().length;

/**
 * Clusteriza a aplicação, permitindo a execução de múltiplos processos em paralelo.
 * O callback é executado apenas pelos workers secundários.
 *
 * @param {Function} callback - O callback a ser executado pelos workers secundários.
 * @returns {void}
 */
@Injectable()
export default class AppClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
