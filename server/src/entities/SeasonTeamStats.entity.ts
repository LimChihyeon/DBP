import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Team } from './Teams.entity';

@Entity()
export class SeasonTeamStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  team: Team;

  @Column()
  season: string;

  @Column({ default: 0 })
  matches_played: number;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  draws: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  goals_for: number;

  @Column({ default: 0 })
  goals_against: number;
}
