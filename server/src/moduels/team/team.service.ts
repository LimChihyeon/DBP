import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonTeamStat } from 'src/entities/SeasonTeamStats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(SeasonTeamStat)
    private readonly seasonTeamStatRepo: Repository<SeasonTeamStat>,
  ) {}

  async findBySeason(season: string) {
    return this.seasonTeamStatRepo.find({
      where: { season },
      relations: ['team'],
    });
  }

  async findTeamStats(team1: string, season1: string, team2: string, season2: string): Promise<SeasonTeamStat[]> {
    const stats1 = await this.seasonTeamStatRepo.findOne({
      where: {
        team: { name: team1 },
        season: season1,
      },
      relations: ['team'],
    });

    const stats2 = await this.seasonTeamStatRepo.findOne({
      where: {
        team: { name: team2 },
        season: season2,
      },
      relations: ['team'],
    });

    if (!stats1 || !stats2) {
      throw new Error('Stats for one or both teams not found');
    }

    return [stats1, stats2];
  }
}
