import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './Players.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  founded: string;

  @Column()
  stadium: string;

  @Column()
  coach: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
