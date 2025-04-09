import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemMagico } from './Item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemMagico)
    private readonly itemRepository: Repository<ItemMagico>,
  ) {}

  async createItem(item: ItemMagico) {
    item.validate();
    return await this.itemRepository.save(item);
  }

  async findAllItems(): Promise<ItemMagico[]> {
    return this.itemRepository.find();
  }

  async findItemById(id: number): Promise<ItemMagico> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) throw new Error(`Item com id ${id} não encontrado.`);
    return item;
  }
}
