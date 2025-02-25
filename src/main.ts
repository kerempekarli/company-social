// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // ✅ Express için Nest adaptörü

async function bootstrap() {
  // ✅ Express Adapter Kullan
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Statik Dosya Sunma - /uploads klasörünü sunuyoruz
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(3000);
}
bootstrap();
