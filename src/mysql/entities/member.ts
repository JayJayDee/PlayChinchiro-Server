import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 30
  })
  @Index({ unique: true })
  public loginId: string;

  @Column({
    length: 120
  })
  public password: string;
}