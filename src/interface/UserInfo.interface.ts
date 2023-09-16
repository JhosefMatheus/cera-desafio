import { Types } from "mongoose";

interface Contato {
    whatsapp: string;
}

export interface UserInfo {
    id: Types.ObjectId;
    email: string;
    nome: string;
    contato: Contato;
    dataRegistro: Date;
}