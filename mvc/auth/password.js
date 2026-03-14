import crypto from "node:crypto";

const SCRYPT_PREFIX = "scrypt";

async function tryImportBcrypt() {
  try {
    const mod = await import("bcrypt");
    return mod.default || mod;
  } catch (_error) {
    return null;
  }
}

function scryptHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function hashPassword(password) {
  const bcrypt = await tryImportBcrypt();
  if (bcrypt) {
    return bcrypt.hash(password, 10);
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await scryptHash(password, salt);
  return `${SCRYPT_PREFIX}$${salt}$${hash}`;
}

export async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== "string" || !storedHash) return false;

  if (storedHash.startsWith("$2")) {
    const bcrypt = await tryImportBcrypt();
    if (!bcrypt) return false;
    return bcrypt.compare(password, storedHash);
  }

  if (!storedHash.startsWith(`${SCRYPT_PREFIX}$`)) {
    return false;
  }

  const [, salt, hash] = storedHash.split("$");
  if (!salt || !hash) return false;

  const computedHash = await scryptHash(password, salt);
  const hashBuffer = Buffer.from(hash, "hex");
  const computedBuffer = Buffer.from(computedHash, "hex");
  if (hashBuffer.length !== computedBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, computedBuffer);
}
