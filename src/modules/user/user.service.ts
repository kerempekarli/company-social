import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';           // User Entity
import { CreateUserDto } from './dto/create-user.dto';  // DTO - create
import { UpdateUserDto } from './dto/update-user.dto';  // DTO - update

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Tüm kullanıcıları getirir.
   */
  findAll(): Promise<User[]> {
    // İlişkilendirilmiş tabloları çekmek isterseniz relations: [] kullanabilirsiniz
    return this.userRepository.find();
  }

  /**
   * Belirli bir kullanıcıyı ID bazında bulur.
   * Bulunamazsa NotFoundException fırlatır.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  

  /**
   * Email adresine göre kullanıcı bulmak için ek method (opsiyonel).
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Yeni kullanıcı oluşturur.
   * Parola alanını bcrypt ile hash’ler ve veritabanına kaydeder.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...otherFields } = createUserDto;

    // Parola hash’leme
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...otherFields,
      password: password,
    });
    return this.userRepository.save(newUser);
  }

  /**
   * Mevcut bir kullanıcıyı günceller.
   * Dto'da parola varsa yeniden hash’ler, yoksa aynen bırakır.
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
   * Kullanıcıyı siler (Soft-delete veya hard-delete proje ihtiyacına göre).
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Kullanıcı var mı kontrolü
    await this.userRepository.delete(id);
  }
}
