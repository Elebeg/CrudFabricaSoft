import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class ItemMagico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    type: 'Arma' | 'Armadura' | 'Amuleto';  

    @Column({ default: 0 })
    force: number;  

    @Column({ default: 0 })
    defense: number;  

    validate() {
        if (this.force === 0 && this.defense === 0) {
            throw new Error("Item mágico deve ter força ou defesa maior que zero.");
        }
        if (this.type === 'Arma' && this.defense > 0) {
            throw new Error("Armas não podem ter defesa.");
        }
        if (this.type === 'Armadura' && this.force> 0) {
            throw new Error("Armaduras não podem ter força.");
        }
    }
}
