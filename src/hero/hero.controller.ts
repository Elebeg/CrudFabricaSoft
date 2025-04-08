import { Body, Controller, Post } from "@nestjs/common";
import { HeroService } from "./hero.service";

@Controller('hero')
export class HeroController {
    constructor(private heroService: HeroService) {}

    @Post()
    async create(@Body() createHeroDTO: CreateHeroDto){
        this.heroService.createHero(createHeroDTO);
    }
}