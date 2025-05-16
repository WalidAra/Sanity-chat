from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
import base64
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Generate AES key (32 bytes for AES-256)
KEY = os.urandom(32)
print(f"Server encryption key: {base64.b64encode(KEY).decode('utf-8')}")

class EncryptRequest(BaseModel):
    plaintext: str

class DecryptRequest(BaseModel):
    ciphertext: str
    iv: str

def encrypt_data(plaintext: str, key: bytes) -> tuple[bytes, bytes]:
    # Generate random initialization vector
    iv = os.urandom(16)
    
    # Pad the plaintext
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(plaintext.encode()) + padder.finalize()
    
    # Create cipher and encrypt
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    return ciphertext, iv

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
        ciphertext, iv = encrypt_data(request.plaintext, KEY)
        return {
            "ciphertext": base64.b64encode(ciphertext).decode(),
            "iv": base64.b64encode(iv).decode()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/decrypt")
async def decrypt_endpoint(request: DecryptRequest):
    try:
        ciphertext = base64.b64decode(request.ciphertext)
        iv = base64.b64decode(request.iv)
        plaintext = decrypt_data(ciphertext, iv, KEY)
        return {"plaintext": plaintext}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Decryption failed: " + str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)