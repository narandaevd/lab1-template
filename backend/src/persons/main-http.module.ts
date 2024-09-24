import { Module } from "@nestjs/common";
import { PersonsModule } from "./persons.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "./person.entity";

@Module({
  imports: [PersonsModule, TypeOrmModule.forRoot({
    entities: [Person],
    synchronize: true,
    host: 'localhost',
    port: 5432,
    database: 'persons',
    username: 'postgres',
    password: 'postgres',
    type: 'postgres',
  })]
})
export class MainHttpModule {}
