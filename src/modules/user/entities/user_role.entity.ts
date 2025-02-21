// src/modules/user/entities/user_role.entity.ts
import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Role } from '../../role/entities/role.entity';
  
  @Entity('user_role')
  export class UserRole {
    @PrimaryColumn()
    user_id: number;
  
    @PrimaryColumn()
    role_id: number;
  
    @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;
  
    @CreateDateColumn()
    assigned_at: Date;
  }
  