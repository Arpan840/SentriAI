import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

export class SecurityUtil {
  static generateEncryptionKey(): string {
    return randomBytes(32).toString('hex');
  }

  static wrapKey(plainKey: string): string {
    const rawKey = process.env.MASTER_ENCRYPTION_KEY!.trim();

    console.log('hex chars =', rawKey.length);

    const key = Buffer.from(rawKey, 'hex');

    console.log('buffer bytes =', key.length);

    if (rawKey.length !== 64) {
      throw new Error('MASTER_ENCRYPTION_KEY must be 64 hex chars');
    }

    if (key.length !== 32) {
      throw new Error('MASTER_ENCRYPTION_KEY must decode to 32 bytes');
    }

    const iv = randomBytes(12);

    const cipher = createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(plainKey, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return [iv.toString('hex'), authTag.toString('hex'), encrypted].join(':');
  }

  static unwrapKey(wrappedKey: string): string {
    const [ivHex, authTagHex, encrypted] = wrappedKey.split(':');

    const masterKey = Buffer.from(
      process.env.MASTER_ENCRYPTION_KEY!.trim(),
      'hex',
    );

    if (masterKey.length !== 32) {
      throw new Error('MASTER_ENCRYPTION_KEY invalid');
    }

    const decipher = createDecipheriv(
      'aes-256-gcm',
      masterKey,
      Buffer.from(ivHex, 'hex'),
    );

    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
  }

  static resolveUserEncryptionKey(
    userData: { encryptionKey?: string | null } | null | undefined,
  ): string | null {
    const wrappedEncryptionKey = userData?.encryptionKey;
    if (!wrappedEncryptionKey) {
      return null;
    }

    try {
      return this.unwrapKey(wrappedEncryptionKey);
    } catch {
      return null;
    }
  }

  static encryptWithTenantKey(plainText: string, tenantKeyHex: string): string {
    const key = Buffer.from(tenantKeyHex, 'hex');

    if (key.length !== 32) {
      throw new Error('Tenant key invalid');
    }

    const iv = randomBytes(12);

    const cipher = createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return [iv.toString('hex'), authTag.toString('hex'), encrypted].join(':');
  }

  static decryptWithTenantKey(
    encryptedText: string,
    tenantKeyHex: string,
  ): string {
    const key = Buffer.from(tenantKeyHex, 'hex');

    if (key.length !== 32) {
      throw new Error('Tenant key invalid');
    }

    const [ivHex, authTagHex, encrypted] = encryptedText.split(':');

    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('Invalid encrypted payload');
    }

    const iv = Buffer.from(ivHex, 'hex');

    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
