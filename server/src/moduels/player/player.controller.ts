import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { SeasonPlayerStat } from 'src/entities/SeasonPlayerStats.entity';

@Controller('playerstats')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getPlayerStats(
    @Query('player1') player1: string,
    @Query('player2') player2: string,
    @Query('season') season: string,
  ): Promise<SeasonPlayerStat[]> {
    if (!player1 || !player2 || !season) {
      throw new BadRequestException('player1, player2, and season are required');
    }

    try {
      const stats = await this.playerService.findPlayerStats([player1, player2], season);
      return stats;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
