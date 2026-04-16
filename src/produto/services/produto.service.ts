import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";


@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>) { }

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.find();
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOneBy({ id });

        if (!produto) {
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        return produto;

    }

    async create(produto: Produto): Promise<Produto> {
        return this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<any> {
   
     const buscaProduto = await this.produtoRepository.findOne({
       where: { id: produto.id }
     });
   
     if (!buscaProduto) {
       throw new NotFoundException('Produto não encontrado!');
     }
   
     return { mensagem: 'Produto atualizado com sucesso!' }
     
    }

    async delete(id: number): Promise<any> {

        const produto = await this.findById(id);

        if (!produto) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        await this.produtoRepository.delete(id);

        return { mensagem: 'Produto apagado com sucesso!' };
    }

}