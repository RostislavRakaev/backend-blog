import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UserModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ULTIMATE_SECRET_JWT',
      signOptions: { expiresIn: '30m' }
    })
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
