import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "./entities/user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
    }


    findByEmail(email: string) {
        return this.repo.findOne({where: {email}});
    }


    findById(id: string) {
        return this.repo.findOne({where: {id}});
    }

    async create(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    async setRefreshTokenHash(userId: string, refreshTokenHash: string | null) {
        await this.repo.update({id: userId}, {refreshTokenHash});
    }
}