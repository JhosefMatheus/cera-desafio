import * as CryptoJS from "crypto-js";

export function hashPassword(password: string): string {
    const hashedPassword: string = CryptoJS.SHA256(password).toString();

    return hashedPassword;
}