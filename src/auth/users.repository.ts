import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import User from './user.entity';
import AuthCredentalsDto from './dto/auth-credentials.dto';

@Injectable()
export default class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentalsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
