import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcrypt';
import SingUpCredentialsDto from './dto/signup-credentials.dto';

@Injectable()
export default class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(signUpCredentialsDto: SingUpCredentialsDto): Promise<void> {
    const { username, password, name, surname, email } = signUpCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const hashesPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashesPassword,
      name,
      surname,
      email,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('username')) {
          throw new ConflictException('username already exists.');
        }
        if (error.detail.includes('email')) {
          throw new ConflictException('email already exists.');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
