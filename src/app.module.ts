import { UsersModule } from './features/users/users.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './core/entities/users/users.entity';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'api_user',
      password: 'api_password',
      database: 'api_db',
      entities: [UsersEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ConfidenceMiddleware).forRoutes(TontineController);
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
