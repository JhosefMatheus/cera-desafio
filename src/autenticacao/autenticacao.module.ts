import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario, UsuarioSchema } from "src/schemas/usuario.schema";
import { AutenticacaoController } from "./autenticacao.controller";
import { AutenticacaoService } from "./autenticacao.service";

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
        AutenticacaoController
    ],
    providers: [
        AutenticacaoService
    ]
})
export class AutenticacaoModule {}