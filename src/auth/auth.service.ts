import { Injectable } from '@nestjs/common';
import UserRepository from './users.repository';
import AuthCredentalsDto from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UserRepository) {}
  
  async signUp(authCredentialsDto: AuthCredentalsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }
}
