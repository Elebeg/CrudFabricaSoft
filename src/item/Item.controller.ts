import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemMagico } from './Item.entity';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(@Body() item: ItemMagico) {
    return this.itemService.createItem(item);
  }

  @Get()
  async findAllItems() {
    return this.itemService.findAllItems();
  }

  @Get(':id')
  async findItemById(@Param('id') id: number) {
    return this.itemService.findItemById(id);
  }
}
