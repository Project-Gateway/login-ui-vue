import { Base64 } from 'js-base64';

const parseJwt = (token) => {
  const [, payload] = token.split('.');
  const { sub: userId, iat: createdAt, nbf: notBefore, exp: expiresAt, dbRole, role, childRoles } = JSON.parse(
    Base64.decode(payload),
  );
  return { userId, createdAt, notBefore, expiresAt, role, dbRole, childRoles };
};

export default parseJwt;
