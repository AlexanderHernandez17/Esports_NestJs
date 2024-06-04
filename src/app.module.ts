import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentModule } from "./tournament/tournament.module";
import { PlayerModule } from './player/player.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      "ssl": true
    }),
    TournamentModule,
    PlayerModule,
    ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

