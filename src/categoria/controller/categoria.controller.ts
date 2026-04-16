import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller("/categorias")
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) {}

  @Get() // busca por todos 
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get("/:id") // id 
  findById(@Param("id") id: number) {
    return this.categoriaService.findById(id);
  }

  @Get("/nome/:nome") // busca pelo nome
  findByNome(@Param("nome") nome: string) {
    return this.categoriaService.findByNome(nome);
  }

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  @Put()
  update(@Body() categoria: Categoria) {
    return this.categoriaService.update(categoria);
  }


  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.categoriaService.delete(id);
  }
}



