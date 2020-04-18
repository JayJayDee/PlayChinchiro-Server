import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 30
  })
  public loginId: string;

  @Column({
    length: 120
  })
  public password: string;
}