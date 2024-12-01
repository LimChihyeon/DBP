import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { SeasonPlayerStat } from 'src/entities/SeasonPlayerStats.entity';
import { Player } from 'src/entities/Players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonPlayerStat, Player])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
