import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import UserRepository from "./users.repository";
import User from "./user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "src/constants/types";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersRepository: UserRepository, private configService: ConfigService) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.usersRepository.findOneBy({ username });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}