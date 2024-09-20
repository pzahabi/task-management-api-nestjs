import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthCredentalsDto from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentalsDto: AuthCredentalsDto): Promise<void> {
        return this.authService.signUp(authCredentalsDto);
    }
    
    @Post('/signin')
    signIn(@Body() authCredentalsDto: AuthCredentalsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentalsDto);
    }
}
