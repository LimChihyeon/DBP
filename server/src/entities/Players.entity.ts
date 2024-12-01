import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './Teams.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;
}
