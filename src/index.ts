import express, { Request, Response } from 'express';
import { SQSClient, ListQueuesCommand, SendMessageCommand, SendMessageCommandOutput, SendMessageCommandInput } from "@aws-sdk/client-sqs";
import UserModel from './models/user.model';
import { StatusCodes } from 'http-status-codes';
import { MongooseError } from 'mongoose';
import './config/database'; // Import the singleton instance to ensure the DB connection is established

const app = express();
app.use(express.json()) // for parsing application/json

const client = new SQSClient({ region: "us-east-1" });

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

app.post('/queue', async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await sendMessageToSqs({ MessageBody: JSON.stringify(user), QueueUrl: '' })
    res.status(StatusCodes.CREATED).json(result)
});


const sendMessageToSqs = async (data: SendMessageCommandInput): Promise<SendMessageCommandOutput> => {
    const command = new SendMessageCommand(data);
    return await client.send(command);
}

app.listen(3000, () => {
    console.log('server running')
})