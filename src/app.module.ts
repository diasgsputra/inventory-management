import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'inventory_db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    InventoryModule,
    AuthModule,
  ],
})
export class AppModule {}
