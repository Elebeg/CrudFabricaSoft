import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { ItemMagico } from '../item/Item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero, ItemMagico])],
  providers: [HeroService],
  controllers: [HeroController],
})
export class HeroModule {}
