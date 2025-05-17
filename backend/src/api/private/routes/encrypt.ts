import { AES } from "@/helpers/aes";
import { Request, Response, Router } from "express";
const router = Router();

const aes = new AES();
router.post("/decrypt", (req: Request, res: Response) => {
  const { encryptedText } = req.body;
  const decryptedText = aes.decrypt(encryptedText);
  res
    .status(200)
    .json({ data: decryptedText, message: "Decryption successful" });
});

export default router;
