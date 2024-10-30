import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserRepository from './users.repository';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import SingUpCredentialsDto from './dto/signup-credentials.dto';
import { JwtPayload, SignInResponse } from 'src/constants/types';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UserRepository, private jwtService: JwtService) {}
  
  async signUp(signUpCredentialsDto: SingUpCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(signUpCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
    const { username, password } = authCredentialsDto;
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
