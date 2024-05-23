import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TypingContentModule } from './typing-content/typing-content.module';

@Module({
  imports: [PrismaModule, TypingContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
