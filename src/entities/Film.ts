import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from './User';

@Entity("films")
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "text", nullable: false})
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title: string;

  @Column({type: "text", nullable: false})
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;

  @ManyToOne(() => User, user => user.films)
  @JoinColumn({name: "user_id"})
  user: User;

  constructor(title: string, description: string, user: User) {
    this.title = title;
    this.description = description;
    this.user = user;
  }
}
