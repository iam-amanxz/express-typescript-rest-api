import { genSalt, hash } from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  BaseEntity,
  BeforeInsert,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

import { Length } from 'class-validator';
import { Comment } from './Comment.entity';
import { Topic } from './Topic.entity';
import { Profile } from './Profile.entity';

export enum ERole {
  USER,
  ADMIN,
}

export enum EOnlineStatus {
  ACTIVE,
  AWAY,
  INVISIBLE,
}

@Entity('user')
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Length(3, 15, {
    message: 'username must be between 3 and 15 char long',
  })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(5, 255, {
    message: 'password must be at lease 5 char long',
  })
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @Column({ type: 'enum', enum: EOnlineStatus, default: EOnlineStatus.ACTIVE })
  onlineStatus: EOnlineStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;

  @ManyToMany(() => Topic, (topic) => topic.members)
  joinedTopics: Topic[];

  // @OneToMany(() => Comment, (comment) => comment.owner)
  // comments: Promise<Comment>[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
  }

  static findByUsername(username: string) {
    return this.findOne({ username });
  }

  toJSON() {
    return classToPlain(this);
  }
}
