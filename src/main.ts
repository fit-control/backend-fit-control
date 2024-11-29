import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const configSwagger = new DocumentBuilder().setTitle('Fit Control API').setDescription('Api created for a personal project, fit control is a management system for personal trainers.').setVersion('1.0').addTag('Users').build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('v1', app, document)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.setGlobalPrefix('v1/');
  await app.listen(+configService.get('PORT') || 3000);
}
bootstrap();
