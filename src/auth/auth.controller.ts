import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import SingUpCredentialsDto from './dto/signup-credentials.dto';
import { SignInResponse } from 'src/constants/types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpCredentialsDto: SingUpCredentialsDto): Promise<void> {
        return await this.authService.signUp(signUpCredentialsDto);
    }
    
    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
        return await this.authService.signIn(authCredentialsDto);
    }
}
