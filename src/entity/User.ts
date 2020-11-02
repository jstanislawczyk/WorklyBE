import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsString()
  @MaxLength(60)
  public username: string;

  @Column()
  @IsString()
  @MaxLength(60)
  @MinLength(4)
  public password: string;
}
