from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# STATIC AES-256 KEY (32 bytes) and IV (16 bytes)
# (In real apps, store securely and never hardcode)
STATIC_KEY = b"\x01" * 32  # Example: 32 bytes of value 1
STATIC_IV = b"\x02" * 16   # Example: 16 bytes of value 2

class EncryptRequest(BaseModel):
    plaintext: str

class DecryptRequest(BaseModel):
    ciphertext: str

def encrypt_data(plaintext: str, key: bytes, iv: bytes) -> bytes:
    # Pad the plaintext
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(plaintext.encode()) + padder.finalize()

    # Create cipher and encrypt
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()

    return ciphertext

def decrypt_data(ciphertext: bytes, iv: bytes, key: bytes) -> str:
    # Create cipher and decrypt
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()

    # Unpad the decrypted data
    unpadder = padding.PKCS7(128).unpadder()
    unpadded_data = unpadder.update(decrypted_data) + unpadder.finalize()

    return unpadded_data.decode()

@app.post("/encrypt")
async def encrypt_endpoint(request: EncryptRequest):
    try:
        ciphertext = encrypt_data(request.plaintext, STATIC_KEY, STATIC_IV)
        return {
            "ciphertext": base64.b64encode(ciphertext).decode()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/decrypt")
async def decrypt_endpoint(request: DecryptRequest):
    try:
        ciphertext = base64.b64decode(request.ciphertext)
        plaintext = decrypt_data(ciphertext, STATIC_IV, STATIC_KEY)
        return {"plaintext": plaintext}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Decryption failed: " + str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
