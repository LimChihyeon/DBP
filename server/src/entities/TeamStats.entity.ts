import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Match } from './Matchs.entity';
import { Team } from './Teams.entity';

@Entity()
export class TeamStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match)
  match: Match;

  @ManyToOne(() => Team)
  team: Team;

  @Column({ default: 0 })
  goals_scored: number;

  @Column({ default: 0 })
  goals_conceded: number;

  @Column({ default: 0 })
  shots: number;

  @Column({ default: 0 })
  shots_on_target: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  possession: number;

  @Column({ default: 0 })
  corners: number;

  @Column({ default: 0 })
  fouls: number;
}
