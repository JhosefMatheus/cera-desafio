import { IsNotEmpty, IsString } from "class-validator";

export class EntrarUsuarioDto {
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
}