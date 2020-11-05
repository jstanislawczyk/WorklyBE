import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsEmail()
  public email: string;

  @Column()
  @IsString()
  @MaxLength(60)
  @MinLength(4)
  public password: string;
}
