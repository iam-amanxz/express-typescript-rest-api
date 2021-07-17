import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

export enum EGender {
  NONE,
  MALE,
  FEMALE,
  OTHER,
}

@Entity('profile')
export class Profile extends BaseEntity {
  constructor(profile: Partial<Profile>) {
    super();
    Object.assign(this, profile);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date', nullable: true, default: null })
  dateOfBith?: Date;

  @Column({ type: 'varchar', nullable: true, default: '' })
  profilePictureUrl?: string;

  @Column({ type: 'text', nullable: true, default: '' })
  bio?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  displayName?: string;

  @Column({
    type: 'enum',
    enum: EGender,
    nullable: true,
    default: EGender.NONE,
  })
  gender?: EGender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
