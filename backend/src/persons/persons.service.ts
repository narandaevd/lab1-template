import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "./person.entity";
import { Repository } from "typeorm";
import { PersonRequest } from "./dtos/person.request";
import { PersonResponse } from "./dtos/person.response";

@Injectable()
export class PersonsService {
  public constructor(
    @InjectRepository(Person)
    private repo: Repository<Person>,
  ) {}

  async getAll() {
    return await this.repo.find();
  }

  async getById(id: number) {
    const maybeFoundPerson = await this.repo.findOneBy({id});
    if (!maybeFoundPerson)
      throw new NotFoundException('Нет такого person');
    return maybeFoundPerson;
  }

  async deleteById(id: number) {
    await this.repo.delete({id});
  }

  async create(dto: PersonRequest) {
    const personModel = this.repo.create(dto);
    const createdPerson = await this.repo.save(personModel);
    return Object.assign(new PersonResponse(), createdPerson);
  }

  async update(id: number, dto: PersonRequest) {
    const notExists = await this.repo.findOne({
      where: {id},
      select: {
        id: true,
      }
    })
      .then(Boolean)
      .then(isExists => !isExists);
    if (notExists)
      throw new NotFoundException('Нет такого person');
    await this.repo.update(id, dto);
    const personModel = await this.getById(id);
    return Object.assign(new PersonResponse(), personModel);
  }
}
