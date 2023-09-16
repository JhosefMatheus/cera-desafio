import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/schemas/usuario.schema';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Usuario.name,
                schema: UsuarioSchema
            }
        ])
    ],
    controllers: [
        PerfilController
    ],
    providers: [
        PerfilService
    ]
})
export class PerfilModule {}