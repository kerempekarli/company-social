import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  /**
   * Tüm kullanıcıları getirir.
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['roles'], // Rollerle birlikte çekmek istiyorsanız
    });
  }

  /**
   * Kullanıcıyı ID'ye göre bulur.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['roles'], // Rollerle birlikte çekmek istiyorsanız
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Email'e göre kullanıcı bulmak için (Auth vb. yerlerde kullanılıyor).
   */
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Yeni kullanıcı oluştur.
   * (Proje gereksinimine göre hash burada veya auth tarafında yapılabilir.)
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...otherFields } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...otherFields,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  /**
   * Kullanıcı güncelle.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Kullanıcı sil.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Kontrol
    await this.userRepository.delete(id);
  }

  /**
   * Kullanıcıya rol atama.
   * ManyToMany ilişki olduğundan, user.roles dizisine yeni rol ekliyoruz.
   */
  async assignRole(userId: number, roleId: number): Promise<User> {
    const user = await this.findOne(userId);
    const role = await this.roleRepository.findOne({
      where: { role_id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Eğer kullanıcıda bu rol zaten varsa, tekrar eklemeyebilirsiniz.
    // Aşağıdaki kontrol opsiyoneldir:
    const hasRole = user.roles.some((r) => r.role_id === roleId);
    if (hasRole) {
      return user; // veya hata fırlatabilirsiniz: throw new ConflictException('User already has this role');
    }

    user.roles.push(role);
    return this.userRepository.save(user);
  }

  async removeRole(userId: number, roleId: number): Promise<User> {
  const user = await this.findOne(userId);
  const role = await this.roleRepository.findOne({
    where: { role_id: roleId },
  });

  if (!role) {
    throw new NotFoundException(`Role with ID ${roleId} not found`);
  }

  // Kullanıcının bu rolü olup olmadığını kontrol et
  user.roles = user.roles.filter((r) => r.role_id !== roleId);
  return this.userRepository.save(user);
}

}
