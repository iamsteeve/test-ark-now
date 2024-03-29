import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  public async validateUserByEmail(email: string): Promise<User> {
    return await this.service.findOneByEmail(email);
  }

  public async registerUserIfNotExist(registerUserDto: RegisterUserDto): Promise<User> {
    let user: User = await this.validateUserByEmail(registerUserDto.email);
    if (user) {
      return user;
    }

    const { name, email, password } = registerUserDto;
    user = await this.service.create({ name, email, password });
    return await this.service.save(user);
  }
}
