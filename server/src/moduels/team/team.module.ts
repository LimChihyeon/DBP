import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { SeasonTeamStat } from 'src/entities/SeasonTeamStats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonTeamStat])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModuel {}
