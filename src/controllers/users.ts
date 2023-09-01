import express from 'express'

import { getUser } from '../db/users'


export const getAllUsers = async (req: express.Request, res: express.Response) => {

    try {

        const users = await getUser();

        res.status(200).json(users)

    } catch (error) {
        console.log(`error at getAllUsers`, error);
        return res.sendStatus(400)
    }
}