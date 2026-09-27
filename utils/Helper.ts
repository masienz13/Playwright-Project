import { randomBytes, randomInt } from 'node:crypto';

export function uniqueSuffix(): string {
  return `${Date.now().toString(36)}${randomBytes(2).toString('hex')}`;
}

export function uniqueEmployeeId(): string {
  return String(randomInt(10_000, 100_000));
}

export function generatedEmployeeCredentials(): { username: string; password: string } {
  const suffix = uniqueSuffix();
  return {
    username: `hp${suffix}`,
    password: `Hp!${suffix}9a`,
  };
}
