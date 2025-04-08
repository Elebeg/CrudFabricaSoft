import { Module, forwardRef } from "@nestjs/common";
import { HeroService } from "../hero/hero.service";
import { ItemController } from "./Item.controller";
import { ItemService } from "./item.service";

@Module({

    imports: [forwardRef(() => HeroService)],
    controllers: [ItemController],
    providers: [ItemService]
    
})
export class ItemModule{}