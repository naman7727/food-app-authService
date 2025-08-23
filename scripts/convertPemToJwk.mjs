/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "fs";
import rsaPemToJwk from "rsa-pem-to-jwk";

const privateKey = fs.readFileSync("certs/public.pem");

const jwk = rsaPemToJwk(privateKey, { use: "sig", alg: "RS256" }, "public");

// eslint-disable-next-line no-undef
console.log(JSON.stringify(jwk));
