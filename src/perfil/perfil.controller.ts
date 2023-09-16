import { Body, Controller, Get, NotFoundException, Param, Patch, Req, Res, UseGuards } from "@nestjs/common";
import { PerfilService } from "./perfil.service";
import { Response, Request } from "express";
import { JwtGuard } from "src/guards/jwt.guard";
import { Types } from "mongoose";
import { AlterarSenhaResponse, BuscarPerfilResponse } from "./response";
import { AlterarSenhaDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('perfil')
export class PerfilController {
    constructor(
        private readonly perfilService: PerfilService
    ) {}

    @Get(":idUsuario")
    async buscarPerfil(
        @Res() response: Response,
        @Param("idUsuario") idUsuario: string,
        @Req() request: Request
    ): Promise<Response> {
        try {
            const currentUserId : Types.ObjectId = new Types.ObjectId(request["user"].id);

            if (currentUserId.toString() !== idUsuario) {
                return response.status(401).json({
                    mensagem: "Não autorizado"
                });
            }

             const buscarPerfilResponse: BuscarPerfilResponse = await this.perfilService.buscarPerfil(new Types.ObjectId(idUsuario));

            return response.status(200).json({
                ...buscarPerfilResponse
            });
        } catch (error: any) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({
                    mensagem: error.message
                });
            }
            
            return response.status(500).json({
                mensagem: "Erro ao buscar perfil"
            });
        }
    }

    @Patch("/senha/alterar/:idUsuario")
    async alterarSenha(
        @Res() response: Response,
        @Param("idUsuario") idUsuario: string,
        @Req() request: Request,
        @Body() alterarSenhaDto: AlterarSenhaDto
    ): Promise<Response> {
        try {
            const currentUserId : Types.ObjectId = request["user"].id;

            if (currentUserId.toString() !== idUsuario) {
                return response.status(401).json({
                    mensagem: "Não autorizado"
                });
            }

            const alterarSenhaResponse: AlterarSenhaResponse = await this.perfilService.alterarSenha(new Types.ObjectId(idUsuario), alterarSenhaDto);

            return response.status(200).json({
                ...alterarSenhaResponse
            });
        } catch (error: any) {
            return response.status(500).json({
                mensagem: "Erro ao alterar senha"
            });
        }
    }
}