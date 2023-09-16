import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Types } from "mongoose";
import { Usuario } from "src/schemas/usuario.schema";
import { CriarUsuarioDto, EntrarUsuarioDto } from "./dto";
import { CriarUsuarioResponse, EntrarUsuarioReponse } from "./response";
import { JwtService } from "@nestjs/jwt";
import { UserInfo } from "src/interface";
import { hashPassword } from "src/funcs";

@Injectable()
export class AutenticacaoService {
    constructor(
        @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
        private readonly jwtService: JwtService
    ) {}

    private async gerarToken(usuario: Document<unknown, {}, Usuario> & Usuario & { _id: Types.ObjectId; }): Promise<string> {
        const payload: UserInfo = {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            contato: {
                whatsapp: usuario.contato.whatsapp
            },
            dataRegistro: usuario.dataRegistro
        };

        const token : string = await this.jwtService.signAsync(payload);

        return token;
    }

    async entrar(entrarUsuarioDto: EntrarUsuarioDto): Promise<EntrarUsuarioReponse> {
        try {
            const usuario = await this.usuarioModel.findOne({
                email: entrarUsuarioDto.email,
                senha: hashPassword(entrarUsuarioDto.senha)
            });

            if (!usuario) {
                throw new UnauthorizedException("Usuário não encontrado.");
            }

            const token : string = await this.gerarToken(usuario);

            return {
                mensagem: "Usuário logado com sucesso.",
                token
            }
        } catch (error: any) {
            throw error;
        }
    }

    async registrar(criarUsuarioDto: CriarUsuarioDto): Promise<CriarUsuarioResponse> {
        try {
            const novoUsuario = new this.usuarioModel({
                nome: criarUsuarioDto.nome,
                email: criarUsuarioDto.email,
                senha: hashPassword(criarUsuarioDto.senha),
                contato: {
                    whatsapp: criarUsuarioDto.contato.whatsapp
                }
            });
            await novoUsuario.save();

            return {
                message: "Usuário registrado com sucesso."
            }
        } catch (error: any) {
            throw error;
        }
    }
}