
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
      username: 'postgres',
      password: 'postgres',
      database: 'rpgdb',
      entities: [Hero, ItemMagico],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Hero, ItemMagico]),
    HeroModule,
    ItemModule,
  ],
})
export class AppModule {}

