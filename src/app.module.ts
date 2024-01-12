import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    // TypeOrmModule.forRoot(typeOrmConfig)
  ],
})
export class AppModule {}
