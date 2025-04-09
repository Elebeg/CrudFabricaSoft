import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './hero.entity';

@Controller('heroes')
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    @Post()
    createHero(@Body() hero: Hero) {
        this.heroService.createHero(hero);
    }

    @Get()
    getAllHeroes() {
        return this.heroService.findAllHeros();
    }

    @Get(':id')
    getHeroById(@Param('id') id: number) {
        return this.heroService.findHeroById(id);
    }

    @Post(':heroId/items/:itemId')
    addItemToHero(@Param('heroId') heroId: number, @Param('itemId') itemId: number) {
        this.heroService.addItemToHero(heroId, itemId);
    }

    @Get(':id/items')
    getItemsForHero(@Param('id') id: number) {
        return this.heroService.listItemsForHero(id);
    }

    @Get(':id/amulet')
    getAmuletForHero(@Param('id') id: number) {
        return this.heroService.findAmuletByHero(id);
    }
}
