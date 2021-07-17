import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './User.entity';

@Entity('topic')
export class Topic {
  constructor(topic: Partial<Topic>) {
    Object.assign(this, topic);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar' })
  displayName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => User, (user) => user.ownedTopics)
  // owner: Promise<User>;

  // @ManyToMany(() => User, (user) => user.joinedTopics)
  // members: Promise<User>[];
}
