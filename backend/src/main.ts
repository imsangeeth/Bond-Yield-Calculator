import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BondModule } from './bond/bond.module';

async function bootstrap() {
  const app = await NestFactory.create(BondModule, { logger: ['error', 'warn', 'log'] });

  app.enableCors({
    origin: 'https://bond-yield-calculator-production-5d73.up.railway.app', 
    methods: 'GET,POST',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen(3000);
}

bootstrap().catch((error) => {
  // In a real production app you'd hook this into logging/monitoring
  // but we keep it simple here.
  console.error('Failed to bootstrap application', error);
  process.exit(1);
});

