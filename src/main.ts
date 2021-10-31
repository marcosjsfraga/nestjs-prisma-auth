import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedInterceptor } from './interceptors/UnauthorizedInterceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Interceptors
    app.useGlobalInterceptors(new UnauthorizedInterceptor());

    await app.listen(3000);
}
bootstrap();

// Based on this repo: https://github.com/rocketseat-experts-club/nestjs-auth-28-08-2021
