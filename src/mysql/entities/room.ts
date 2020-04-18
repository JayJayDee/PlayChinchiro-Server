import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { Member } from './member';

@Entity()
export class Room {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 50
  })
  public title: string;

  @Column()
  public numMaxMember: number;

  @OneToMany(() => Member, (member) => member.joinedRoom)
  public members: Member[];

  @CreateDateColumn({
    type: 'timestamp'
  })
  public regDate: Date;
}