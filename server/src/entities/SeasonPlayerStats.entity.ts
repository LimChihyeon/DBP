import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Player } from './Players.entity';

@Entity()
export class SeasonPlayerStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player)
  player: Player;

  @Column()
  season: string;

  @Column({ default: 0 })
  total_goals: number;

  @Column({ default: 0 })
  total_assists: number;

  @Column({ default: 0 })
  total_played: number;

  @Column({ default: 0 })
  total_yellow_cards: number;

  @Column({ default: 0 })
  total_red_cards: number;
}
