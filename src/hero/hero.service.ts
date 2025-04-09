import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.entity';
import { ItemMagico } from '../item/Item.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    @InjectRepository(ItemMagico)
    private readonly itemRepository: Repository<ItemMagico>,
  ) {}

  async createHero(hero: Hero) {
    if (hero.force + hero.defense > 10) {
      throw new Error('A soma de força e defesa não pode ser maior que 10.');
    }
    return await this.heroRepository.save(hero);
  }

  async findAllHeros(): Promise<Hero[]> {
    return this.heroRepository.find({ relations: ['itens'] });
  }

  async findHeroById(id: number): Promise<Hero> {
    const hero = await this.heroRepository.findOne({ where: { id }, relations: ['itens'] });
    if (!hero) throw new Error(`Personagem com o id ${id} não encontrado.`);
    return hero;
  }

  async updateHeroName(id: number, newName: string) {
    const hero = await this.findHeroById(id);
    hero.name = newName;
    return this.heroRepository.save(hero);
  }

  async removeHero(id: number) {
    const hero = await this.findHeroById(id);
    return this.heroRepository.remove(hero);
  }

  async addItemToHero(heroId: number, itemId: number) {
    const hero = await this.findHeroById(heroId);
    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new Error('Item não encontrado.');

    if (item.type === 'Amuleto' && hero.itens.some(i => i.type === 'Amuleto')) {
      throw new Error('O personagem já possui um amuleto.');
    }

    hero.itens.push(item);
    return this.heroRepository.save(hero);
  }

  async removeItemFromHero(heroId: number, itemId: number) {
    const hero = await this.findHeroById(heroId);
    hero.itens = hero.itens.filter(item => item.id !== itemId);
    return this.heroRepository.save(hero);
  }

  async listItemsForHero(heroId: number): Promise<ItemMagico[]> {
    const hero = await this.findHeroById(heroId);
    return hero.itens;
  }

  async findAmuletByHero(heroId: number): Promise<ItemMagico | undefined> {
    const hero = await this.findHeroById(heroId);
    return hero.itens.find(item => item.type === 'Amuleto');
  }
}
