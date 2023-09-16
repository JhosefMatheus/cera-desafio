import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

class Contato {
    @IsString({
        message: "O telefone do usuário deve ser uma string."
    })
    @IsNotEmpty({
        message: "O telefone do usuário é obrigatório."
    })
    whatsapp: string;
}

export class CriarUsuarioDto {
    @IsString({
        message: "O nome do usuário deve ser uma string."
    })
    @IsNotEmpty({
        message: "O nome do usuário é obrigatório."
    })
    nome: string;

    @IsString({
        message: "O email do usuário deve ser uma string."
    })
    @IsNotEmpty({
        message: "O email do usuário é obrigatório."
    })
    email: string;

    @IsString({
        message: "A senha do usuário deve ser uma string."
    })
    @IsNotEmpty({
        message: "A senha do usuário é obrigatória."
    })
    senha: string;

    @Type(() => Contato)
    @IsNotEmpty({
        message: "O contato do usuário é obrigatório."
    })
    contato: Contato;
}