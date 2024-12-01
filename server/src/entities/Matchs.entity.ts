import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Team } from './Teams.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Team)
  home_team: Team;

  @ManyToOne(() => Team)
  away_team: Team;

  @Column()
  score_home: number;

  @Column()
  score_away: number;
}
