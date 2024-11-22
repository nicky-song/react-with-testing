/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

const generateChallenge = async (verifier: string) => {
  const encodedHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));

  const hash = btoa(String.fromCharCode(...new Uint8Array(encodedHash)));

  return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const generateVerifier = (length: number): string => {
  const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';
  const bytes = Array.from(crypto.getRandomValues(new Uint8Array(length)));

  return bytes
    .map((value) => {
      return mask[value % mask.length];
    })
    .join('');
};

export const generatePKCE = async (length = 96) => {
  const verifier = generateVerifier(length);
  const challenge = await generateChallenge(verifier);

  return {
    codeChallenge: challenge,
    codeVerifier: verifier,
  };
};
