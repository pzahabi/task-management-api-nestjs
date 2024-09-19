import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthCredentalsDto from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentalsDto: AuthCredentalsDto) {
        return this.authService.signUp(authCredentalsDto);
    }
}
