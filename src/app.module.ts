
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './hero/hero.entity';
import { HeroModule } from './hero/hero.module';
import { ItemMagico } from './item/Item.entity';
import { ItemModule } from './item/Item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'rpg',
      entities: [Hero, ItemMagico],
      synchronize: true,
    }),
  ],
  providers:[HeroModule, ItemModule],
})
export class AppModule {}
