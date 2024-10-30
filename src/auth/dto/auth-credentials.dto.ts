import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'password must be at least 8 characters, containing lowercase, uppercase, numbers and symbols.',
    },
  )
  password: string;
}
