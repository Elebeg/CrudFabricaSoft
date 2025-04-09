import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Hero } from 'src/hero/hero.entity';

@Entity()
export class ItemMagico {
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
  @ApiProperty({ enum: ['Arma', 'Armadura', 'Amuleto'] })
  type: 'Arma' | 'Armadura' | 'Amuleto';

  @Column({ default: 0 })
  @ApiProperty()
  force: number;

  @Column({ default: 0 })
  @ApiProperty()
  defense: number;

  @ManyToOne(() => Hero, hero => hero.itens)
  @ApiProperty({ type: () => Hero })
  hero: Hero;

  validate() {
    if (this.force === 0 && this.defense === 0) {
      throw new Error("Item mágico deve ter força ou defesa maior que zero.");
    }
    if (this.type === 'Arma' && this.defense > 0) {
      throw new Error("Armas não podem ter defesa.");
    }
    if (this.type === 'Armadura' && this.force > 0) {
      throw new Error("Armaduras não podem ter força.");
    }
  }
}
