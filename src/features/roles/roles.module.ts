import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesEntity } from 'src/core/entities/roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule { }
