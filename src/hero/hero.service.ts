import { Injectable } from '@nestjs/common';
import { Hero } from './hero.entity';
import { ItemMagico } from '../item/Item.entity';

@Injectable()
export class HeroService {
    private readonly heros: Hero[] = [];
    private readonly itens: ItemMagico[] = [];

    createHero(hero: Hero) {
        if (hero.force + hero.defense > 10) {
            throw new Error("A soma de força e defesa não pode ser maior que 10.");
        }
        this.heros.push(hero);
    }

    createItemMagico(item: ItemMagico) {
        item.validate(); 
        this.itens.push(item);
    }

    findAllHeros(): Hero[] {
        return this.heros;
    }

    findHeroById(id: number): Hero {
        return this.heros.find(hero => hero.id === id);
    }

    updateHeroName(id: number, newName: string) {
        const hero = this.findHeroById(id);
        if (hero) {
            hero.name = newName;
        }
    }

    removeHero(id: number) {
        this.heros = this.heros.filter(hero => hero.id !== id);
    }

    addItemToHero(heroId: number, itemId: number) {
        const hero = this.findHeroById(heroId);
        const item = this.itens.find(i => i.id === itemId);

        if (!hero || !item) {
            throw new Error("Personagem ou item não encontrado.");
        }

        if (item.type === 'Amuleto' && hero.itens.some(i => i.type === 'Amuleto')) {
            throw new Error("O personagem já possui um amuleto.");
        }

        hero.itens.push(item);
    }

    removeItemFromHero(heroId: number, itemId: number) {
        const hero = this.findHeroById(heroId);
        if (hero) {
            hero.itens = hero.itens.filter(item => item.id !== itemId);
        }
    }

    listItemsForHero(heroId: number): ItemMagico[] {
        const hero = this.findHeroById(heroId);
        return hero ? hero.itens : [];
    }

    findAmuletByHero(heroId: number): ItemMagico | undefined {
        const hero = this.findHeroById(heroId);
        return hero ? hero.itens.find(item => item.type === 'Amuleto') : undefined;
    }
}
