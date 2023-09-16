import { IsString, IsNotEmpty } from "class-validator";

export class AlterarSenhaDto {
    @IsString({
        message: "senha deve ser uma string."
    })
    @IsNotEmpty({
        message: "senha não pode ser vazia."
    })
    senha: string;
}