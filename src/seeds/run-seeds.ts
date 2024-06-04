// src/seeds/run-seeds.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedsService = app.get(SeedService);

  await seedsService.run(); // Ejecuta el método run del servicio de seeds

  await app.close(); // Cierra la aplicación una vez que se hayan ejecutado las seeds
}

bootstrap();