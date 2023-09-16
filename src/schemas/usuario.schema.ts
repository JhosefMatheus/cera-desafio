import { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({
        required: true
    })
    nome: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    senha: string;

    @Prop(raw({
        whatsapp: { type: String }
    }))
    contato: Record<string, string>;

    @Prop({
        required: true,
        default: Date.now
    })
    dataRegistro: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);