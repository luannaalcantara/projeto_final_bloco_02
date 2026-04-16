import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) { }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {

    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
    }
    return categoria;

  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`)
      }

    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);

  }

  async update(categoria: Categoria): Promise<any> {

  const buscaCategoria = await this.categoriaRepository.findOne({
    where: { id: categoria.id }
  });

  if (!buscaCategoria) {
    throw new NotFoundException('Categoria não encontrada!');
  }

  return { mensagem: 'Categoria atualizada com sucesso!' }

}
  async delete(id: number): Promise<any> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id }
    });

    if (!categoria) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    }

    await this.categoriaRepository.delete(id);

    return { mensagem: 'Categoria apagada com sucesso!' };
  }



}