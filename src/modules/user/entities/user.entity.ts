// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, JoinTable, ManyToMany, OneToMany
} from 'typeorm';
import { UserRole } from './user_role.entity';
import { Role } from '../../role/entities/role.entity';
import { UserTeam } from '../../team/entities/user_team.entity';
import { Team } from '../../team/entities/team.entity';
import { Post } from 'src/modules/post/entities/post.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string; // Hash olarak saklanacak

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ nullable: true })
  office_id?: number; // FK ile offices'e referanslanabilir (ileride relation ekleyebiliriz)

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ length: 500, nullable: true })
  profile_picture_url?: string;


  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'role_id' },
  })
  roles: Role[];

  @OneToMany(() => Post, (post) => post.user, { cascade: true }) // ❗
  posts: Post[]; // Kullanıcının gönderdiği postlar


  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  userTeams: UserTeam[];

  @OneToMany(() => Team, (team) => team.lead)
  teamsLead: Team[];


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
