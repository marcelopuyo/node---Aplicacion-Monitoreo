import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });

  
  //const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Mensaje super grave',
  //     origin: 'App.ts'
  //   }
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'LOW'
  //   }
  // });
  // console.log(logs);
  
  Server.start();

  
  //console.log(envs.EMAILTO, envs.PSWEMAILTO)
}
