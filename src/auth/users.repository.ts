import { Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import User from './user.entity';
import AuthCredentalsDto from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentalsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const hashesPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashesPassword });
    try {
      await this.save(user);
    } catch(error) {
      if(error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
