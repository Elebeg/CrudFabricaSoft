import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemMagico } from '../item/Item.entity';  

@Entity()
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    nameAdventure: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    class: 'Guerreiro' | 'Arqueiro' | 'Mago' | 'Ladino' | 'Bardo';

    @Column()
    level: number;

    @Column('json')
    @IsArray()
    @ValidateNested()
    itens: ItemMagico[]; 

    @Column()
    @IsNotEmpty()
    force: number;

    @Column()
    @IsNotEmpty()
    defense: number;

    getTotalForce(): number {
        let totalForce = this.force;
        this.itens.forEach(item => {
            if (item.type === 'Arma') {
                totalForce += 0;  
            } else if (item.type === 'Amuleto') {
                totalForce += item.force;  
            }
        });
        return totalForce;
    }

    getTotalDefense(): number {
        let totalDefense = this.defense;
        this.itens.forEach(item => {
            if (item.type === 'Armadura') {
                totalDefense += item.defense;  
            } else if (item.type === 'Amuleto') {
                totalDefense += item.defense; 
            }
        });
        return totalDefense;
    }
}
