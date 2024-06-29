import express, { Request, Response } from 'express';
import UserModel from './models/user.model';
import { StatusCodes } from 'http-status-codes';
import { MongooseError } from 'mongoose';
import './config/database'; // Import the singleton instance to ensure the DB connection is established

const app = express();
app.use(express.json()) // for parsing application/json

app.post('/user', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const newuser = new UserModel(user)
        const result = await newuser.save()
        res.status(StatusCodes.CREATED).json(result)

    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(StatusCodes.BAD_REQUEST).json(error)
        }

        res.status(StatusCodes.BAD_GATEWAY).json(error)

    }
});

app.listen(3000, () => {
    console.log('server running')
})