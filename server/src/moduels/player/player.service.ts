import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/Players.entity';
import { SeasonPlayerStat } from 'src/entities/SeasonPlayerStats.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(SeasonPlayerStat)
    private seasonPlayerStatRepo: Repository<SeasonPlayerStat>,
    @InjectRepository(Player)
    private readonly playerRepo: Repository<Player>,
  ) {}

  async findPlayerStats(playerNames: string[], season: string): Promise<SeasonPlayerStat[]> {
    const players = await this.playerRepo.find({
      where: { name: In(playerNames) },
    });

    if (players.length !== playerNames.length) {
      throw new Error('One or both players not found');
    }

    const stats = await this.seasonPlayerStatRepo.find({
      where: {
        player: In(players.map((player) => player.id)),
        season,
      },
      relations: ['player'],
    });

    return stats;
  }
}
