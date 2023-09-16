import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Usuario } from "src/schemas/usuario.schema";
import { AlterarSenhaResponse, BuscarPerfilResponse } from "./response";
import { AlterarSenhaDto } from "./dto";
import { hashPassword } from "src/funcs";

@Injectable()
export class PerfilService {
    constructor(
        @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>
    ) {}

    async buscarPerfil(idUsuario: Types.ObjectId): Promise<BuscarPerfilResponse> {
        try {
            const usuario = await this.usuarioModel.findById(idUsuario);

            if (!usuario) {
                throw new NotFoundException("Usuário não encontrado.");
            }

            return {
                mensagem: "Perfil encontrado.",
                userInfo: {
                    id: usuario._id,
                    nome: usuario.nome,
                    email: usuario.email,
                    contato: {
                        whatsapp: usuario.contato.whatsapp
                    },
                    dataRegistro: usuario.dataRegistro
                }
            }
        } catch (error: any) {
            throw error;
        }
    }

    async alterarSenha(idUsuario: Types.ObjectId, alterarSenhaDto: AlterarSenhaDto): Promise<AlterarSenhaResponse> {
        try {
            const usuario = await this.usuarioModel.findById(idUsuario);

            if (!usuario) {
                throw new NotFoundException("Usuário não encontrado.");
            }

            await usuario.updateOne({
                senha: hashPassword(alterarSenhaDto.senha)
            });

            return {
                mensagem: "Senha alterada com sucesso."
            }
        } catch (error: any) {
            throw error;
        }
    }
}