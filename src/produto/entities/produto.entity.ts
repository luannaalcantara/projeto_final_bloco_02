import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150, nullable: false })
  nome!: string;

  @Column({ length: 255, nullable: false })
  descricao!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  preco!: number;

  @Column({ nullable: false })
  estoque!: number;


  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "categoria_id" })
  categoria!: Categoria;

}