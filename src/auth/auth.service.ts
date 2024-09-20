import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserRepository from './users.repository';
import AuthCredentalsDto from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import JwtPayload from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UserRepository, private jwtService: JwtService) {}
  
  async signUp(authCredentialsDto: AuthCredentalsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentalsDto: AuthCredentalsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentalsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if( user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Username or Password incorrect.');
    }
  }
}
