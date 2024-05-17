import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // validation하는방법 쉬운거 파이프인데 ValidationPipe설정
  app.useLogger(app.get(Logger)); // pino의존성 가져와서 넣기위해서 위에서 설정해줌
  await app.listen(3000);
}
bootstrap();
