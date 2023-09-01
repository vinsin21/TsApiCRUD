import { authentication } from './../helpers/index';
import express from 'express';
import { createUser, getUserByEmail } from './../db/users';
import { random } from './../helpers/index';







export const login = async (req: express.Request, res: express.Response) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) return res.sendStatus(400)

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if (!user) return res.sendStatus(400);

        const expectedHash = authentication(user.authentication.salt, password).toString()

        if (user.authentication.password !== expectedHash) return res.sendStatus(403)

        // to set user session
        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString()).toString()

        await user.save();

        res.cookie("USER_AUTH", user.authentication.sessionToken, { domain: "localhost", path: '/' })

        res.status(200).json(user).end()


    } catch (error) {
        console.log(`error at login controller`, error)
        return res.sendStatus(400)
    }

}









// register function :-
// its a express handler function // usually when only using js we make it inside the controller folder 
// its create a new user in Db with hashed password
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) return res.sendStatus(400)

        const existingUser = await getUserByEmail(email)

        if (existingUser) return res.sendStatus(400)

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }

        })

        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}