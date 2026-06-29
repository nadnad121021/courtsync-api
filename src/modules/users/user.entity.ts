import { Role } from '@modules/roles/role.entity';
import { IUser } from '@modules/users/user.interface';
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Index,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('users')
@Index('idx_user_email', ['email'], { unique: true })
@Index('idx_user_active_not_deleted', ['isActive'], {
  where: `"isDeleted" = false`,
})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({
    // select: false,
  })
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isVerified!: boolean;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles!: Role[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  deletedBy?: string;
}
