import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { SeasonTeamStat } from 'src/entities/SeasonTeamStats.entity';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('teamrank/:season')
  async getTeamRank(@Query('season') season: string) {
    const match = await this.teamService.findBySeason(season);
    return match;
  }

  @Get('teamstats')
  async getTeamStats(
    @Query('team1') team1: string,
    @Query('team2') team2: string,
    @Query('season1') season1: string,
    @Query('season2') season2: string,
  ): Promise<SeasonTeamStat[]> {
    if (!team1 || !team2 || !season1 || !season2) {
      throw new BadRequestException('team1, team2, season1, and season2 are required');
    }

    try {
      const stats = await this.teamService.findTeamStats(team1, season1, team2, season2);
      return stats;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
