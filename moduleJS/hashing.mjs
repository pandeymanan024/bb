// We have implemented our own hashing technique as of now but we will update in future with MD-5 or some other
export class Hashing {
    constructor(){}

    encrypt(encryptData){
        encryptData = encryptData*7 + 7;
        return encryptData;
    }

    decrypt(decryptData){
        decryptData = (decryptData - 7)/7;
        return decryptData;
    }
}