import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 40,
    comment: 'Nickname'
  })
  public nick: string;

  @Column({
    length: 30,
    comment: 'login ID'
  })
  @Index({ unique: true })
  public loginId: string;

  @Column({
    length: 120,
    comment: 'password(hashed)'
  })
  public password: string;

  @Column({
    nullable: true,
    comment: 'joined room id'
  })
  public joinedRoomId?: number;

  @ManyToOne(() => Room, (room) => room.members, { nullable: true })
  @JoinColumn({ name: 'joinedRoomId' })
  public joinedRoom?: Room;

  @CreateDateColumn({
    type: 'timestamp'
  })
  public regDate: Date;
}