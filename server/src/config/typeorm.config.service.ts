import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Match } from 'src/entities/Matchs.entity';
import { Player } from 'src/entities/Players.entity';
import { PlayerStat } from 'src/entities/PlayerStats.entity';
import { SeasonPlayerStat } from 'src/entities/SeasonPlayerStats.entity';
import { SeasonTeamStat } from 'src/entities/SeasonTeamStats.entity';
import { Team } from 'src/entities/Teams.entity';
import { TeamStat } from 'src/entities/TeamStats.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [Match, Player, PlayerStat, SeasonPlayerStat, SeasonTeamStat, Team, TeamStat],
      synchronize: false,
      logging: true,
    };
  }
}
