import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../entities/user.entity';

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idcard: string;

  @Column()
  gender: string;

  @OneToOne(() => User, (user) => user.info, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
