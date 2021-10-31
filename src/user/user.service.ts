import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const data: Prisma.UserCreateInput = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        };

        const createUser = await this.prismaService.user.create({ data });

        return {
            ...createUser,
            password: undefined,
        };
    }

    findAll() {
        return `This action returns all user`;
    }

    findById(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({ where: { email } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
