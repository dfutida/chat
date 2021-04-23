import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";

class UsersService {

    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne( {email} )

        return user;
    }
    
    async create(email: string) {

        //Verificar se usuario existe
        const userExists = await this.usersRepository.findOne({
            email,
        });

        //Se existir retornar user
        if(userExists) {
            return userExists;
        }

        const user = this.usersRepository.create({
            email,
        });

        //Se nao existir salvar no BD
        await this.usersRepository.save(user);

        return user;
    }
}

export { UsersService }