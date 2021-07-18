import { classToPlain, Exclude } from 'class-transformer';
import { Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  BaseEntity,
  Index,
  JoinTable,
} from 'typeorm';
import { User } from './User.entity';

export enum EModRole {
  SUPERADMIN,
  ADMIN,
  MOD,
}

export interface Mod {
  username: string;
  role: EModRole;
}

@Entity('topic')
export class Topic extends BaseEntity {
  constructor(topic: Partial<Topic>) {
    super();
    Object.assign(this, topic);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Column({ unique: true })
  @Length(3, 15, {
    message: 'name must be between 3 and 15 char long',
  })
  name: string;

  @Column({ type: 'varchar', default: '' })
  displayName?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  coverPictureUrl?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  profilePictureUrl?: string;

  @Column({ type: 'text', nullable: true, default: '' })
  bio?: string;

  @Column('simple-json', { nullable: true, default: [] })
  moderators: Mod[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.joinedTopics)
  @JoinTable()
  members: User[];

  static findByName(name: string) {
    return this.findOne({ name });
  }

  toJSON() {
    return classToPlain(this);
  }
}
