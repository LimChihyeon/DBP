import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/Matchs.entity';
import { matchController } from './match.controller';
import { matchService } from './match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [matchController],
  providers: [matchService],
})
export class matchModuel {}
