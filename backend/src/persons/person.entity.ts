import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'person'
})
export class Person {
  
  @PrimaryGeneratedColumn()
  declare id: number;
  
  @Column()
  declare name: string;
  
  @Column({nullable: true})
  declare age?: number;
  
  @Column({nullable: true})
  declare address?: string;
  
  @Column({nullable: true})
  declare work?: string;
}
