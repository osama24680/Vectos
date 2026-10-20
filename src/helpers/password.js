// Password hashing for the demo accounts kept in localStorage.
// There is no backend yet, so this can't make client-side auth truly secure —
// but it guarantees no plain-text password is ever written to the browser.
// Uses PBKDF2 (Web Crypto, available on https and localhost) with a random salt per user.

const ITERATIONS = 100000;

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const createSalt = () => toHex(crypto.getRandomValues(new Uint8Array(16)));

export const hashPassword = async (password, salt) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return toHex(bits);
};

// accounts saved before hashing was added still hold `password`;
// they are verified once against it and then upgraded in place
export const verifyPassword = async (user, password) => {
  if (user.hash && user.salt) {
    return (await hashPassword(password, user.salt)) === user.hash;
  }
  return user.password === password;
};

// what is safe to keep in the session: never the password or its hash
export const publicProfile = ({ name, id, email }) => ({ name, id, email });
