import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    MongooseModule.forRoot(
      'mongodb+srv://mainless:12345678milk@cluster0-gddgz.mongodb.net/blog?retryWrites=true&w=majority', {
      useNewUrlParser: true
    }
    ),
    UserModule,
    PostModule,
    AuthModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
