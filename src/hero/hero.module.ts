import { Inject, Module, forwardRef } from "@nestjs/common";
import { ItemModule } from "src/item/Item.module";
import { HeroController } from "./hero.controller";
import { HeroService } from "./hero.service";


@Module({

    imports: [forwardRef(() => ItemModule)],
    controllers: [HeroController],
    providers: [HeroService],
})

export class HeroModule{}