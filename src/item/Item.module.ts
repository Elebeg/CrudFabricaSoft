import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemMagico } from './Item.entity';
import { ItemService } from './item.service';
import { ItemController } from './Item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemMagico])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
