
import { UsersService } from '../users/users.service';
import { Controller, Post , Body} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    //INTACACION DEL SERVICIO, ASI SE LLAMA AL SERVIICIO DE USERS
    constructor(private usersService : UsersService){}    
    @Post()
    createUser(@Body() newUser : CreateUserDto){
       return this.usersService.createUser(newUser)
    }

}
