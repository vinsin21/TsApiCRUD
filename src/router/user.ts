import { isAuthentication } from '../middlewares/index';
import { getAllUsers } from '../controllers/users';
import express from 'express';


export default (router: express.Router) => {
    router.get('/user', isAuthentication, getAllUsers)
}