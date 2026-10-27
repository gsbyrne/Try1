const username = process.env.ORANGEHRM_USERNAME;
const password = process.env.ORANGEHRM_PASSWORD;

if (!username || !password) {
  throw new Error('Missing ORANGEHRM_USERNAME or ORANGEHRM_PASSWORD. Set them in the root .env file.');
}

export const credentials = { username, password };
