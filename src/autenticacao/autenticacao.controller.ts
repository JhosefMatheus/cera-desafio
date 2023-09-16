import { Body, Controller, Post, Res, UnauthorizedException } from "@nestjs/common";
import { AutenticacaoService } from "./autenticacao.service";
import { Response } from "express";
import { CriarUsuarioDto, EntrarUsuarioDto } from "./dto";
import { CriarUsuarioResponse, EntrarUsuarioReponse } from "./response";
import { MongooseError } from "mongoose";

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(
        private readonly autenticacaoService: AutenticacaoService
    ) {}

    @Post('entrar')
    async entrar(
        @Res() response: Response,
        @Body() entrarUsuarioDto: EntrarUsuarioDto
    ): Promise<Response> {
        try {
            const entrarUsuarioReponse : EntrarUsuarioReponse = await this.autenticacaoService.entrar(entrarUsuarioDto);

            return response.status(200).json({
                ...entrarUsuarioReponse
            });
        } catch (error: any) {
            if (error instanceof UnauthorizedException) {
                return response.status(401).json({
                    mensagem: error.message
                });
            }

            return response.status(500).json({
                mensagem: 'Erro ao entrar'
            });
        }
    }

    @Post('registrar')
    async registrar(
        @Res() response: Response,
        @Body() criarUsuarioDto: CriarUsuarioDto
    ): Promise<Response> {
        try {
            const criarUsuarioResponse : CriarUsuarioResponse = await this.autenticacaoService.registrar(criarUsuarioDto);

            return response.status(200).json({
                ...criarUsuarioResponse
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return response.status(409).json({
                    mensagem: 'Já existe um usuário com o email informado.'
                });
            }

            return response.status(500).json({
                mensagem: 'Erro ao registrar'
            });
        }
    }
}