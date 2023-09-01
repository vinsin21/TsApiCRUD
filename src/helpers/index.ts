import crypto from 'crypto'

const SECRET = "$uper"
// random function genreate salt when we register user we use it  
export const random = () => crypto.randomBytes(128).toString('base64');

// authenication return a Hasehed password 
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest()
}

