import crypto from "crypto";

export class AES {
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    const key = process.env.AES_KEY;
    const iv = process.env.AES_IV;

    if (!key || !iv) {
      throw new Error("AES_KEY and AES_IV must be set in the .env file");
    }

    if (key.length !== 64) {
      throw new Error(
        "Invalid key length. Key must be 64 hexadecimal characters (32 bytes)."
      );
    }
    if (iv.length !== 32) {
      throw new Error(
        "Invalid IV length. IV must be 32 hexadecimal characters (16 bytes)."
      );
    }

    this.key = Buffer.from(key, "hex");
    this.iv = Buffer.from(iv, "hex");
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
