import jwt from 'jsonwebtoken';

import crypto from "crypto";

import config from '../config';

const SALT_ROUNDS = config.auth.saltRounds;

interface ITokenPayload {
  id: string;
}

function generateAccessToken(data: ITokenPayload) {
  return jwt.sign(data, config.auth.accessTokenSecretKey, { expiresIn: config.auth.accessTokenDuration });
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, config.auth.accessTokenSecretKey)
}

export function generateToken(payload: ITokenPayload) {
  const accessToken =  generateAccessToken(payload);
  return {
    accessToken,
    expiresIn: config.auth.accessTokenDuration
  }
}

export function verifyReceivedToken(token: string): ITokenPayload {
  return verifyAccessToken(token) as ITokenPayload
}

export function hashPassword(password: string): string {
  const passwordHash = crypto.pbkdf2Sync(
    password,
    "salt",
    Number.parseInt(SALT_ROUNDS),
    256,
    "sha256",
  );

  return passwordHash.toString('hex');
}