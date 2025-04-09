import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemMagico } from '../item/Item.entity';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameAdventure: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'] })
  class: 'Guerreiro' | 'Arqueiro' | 'Mago' | 'Ladino' | 'Bardo';

  @Column()
  @ApiProperty()
  level: number;

  @OneToMany(() => ItemMagico, item => item.hero, { cascade: true, eager: true })
  @ApiProperty({ type: () => [ItemMagico] })
  itens: ItemMagico[];

  @Column()
  @IsNotEmpty()
  @ApiProperty()
  force: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty()
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
