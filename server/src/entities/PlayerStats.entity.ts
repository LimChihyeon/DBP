import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Match } from './Matchs.entity';
import { Player } from './Players.entity';
import { Team } from './Teams.entity';

@Entity()
export class PlayerStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match)
  match: Match;

  @ManyToOne(() => Player)
  player: Player;

  @ManyToOne(() => Team)
  team: Team;

  @Column()
  minutes_played: number;

  @Column({ default: 0 })
  goals: number;

  @Column({ default: 0 })
  assists: number;

  @Column({ default: 0 })
  yellow_cards: number;

  @Column({ default: 0 })
  red_cards: number;

  @Column({ default: 0 })
  shots_on_target: number;

  @Column({ default: 0 })
  passes: number;

  @Column({ default: 0 })
  tackles: number;
}
