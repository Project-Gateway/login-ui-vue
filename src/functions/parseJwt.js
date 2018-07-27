import { Base64 } from 'js-base64';

const parseJwt = (token) => {
  const [, payload] = token.split('.');
  const { sub: userId, iat: createdAt, nbf: notBefore, exp: expiresAt } = JSON.parse(
    Base64.decode(payload),
  );
  return { userId, createdAt, notBefore, expiresAt };
};

export default parseJwt;
