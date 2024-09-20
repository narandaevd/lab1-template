import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import {PersonsService} from './persons.service';
import { PersonRequest } from "./dtos/person.request";
import { Response } from "express";

@Controller('persons')
export class PersonsController {
  public constructor(private personsService: PersonsService) {}

  @Get()
  async getAll() {
    return await this.personsService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id') stringedId: string,
  ) {
    const id = parseInt(stringedId);
    if (isNaN(id) || id <= 0)
      throw new BadRequestException('id должно быть целым и положительным числом');
    return await this.personsService.getById(id);
  }

  @Post()
  async create(
    @Res({passthrough: true}) res: Response,
    @Body() dto: PersonRequest,
  ) {
    const createdPerson = await this.personsService.create(dto);
    res.setHeader('Location', `/api/v1/persons/${createdPerson.id}`);
  }

  @Patch(':id')
  async update(
    @Param('id') stringedId: string,
    @Body() dto: PersonRequest,
  ) {
    const id = parseInt(stringedId);
    if (isNaN(id) || id <= 0)
      throw new BadRequestException('id должно быть целым и положительным числом');
    return await this.personsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') stringedId: string
  ) {
    const id = parseInt(stringedId);
    if (isNaN(id) || id <= 0)
      throw new BadRequestException('id должно быть целым и положительным числом');
    return await this.personsService.deleteById(id);
  }
}
