const aws = require('aws-sdk');
const {creds} = require('./credentials')
const {SQSClient , SendMessageCommand , AddPermissionCommand} = require('@aws-sdk/client-sqs')
const QueueUrl = process.env.QUEUE_URL
const sqsClient = new SQSClient(creds)
require("dotenv").config()
// const sqs = new aws.SQS();

const sendMessageToQueue = async()=>{
try {
    const params  = {
        QueueUrl,
        MessageBody:Math.random().toString(),
        DelaySeconds:0,
        MessageAttributes:{
            'title':{
                DataType:"String",
                StringValue:"somthin"
            }
        }
    }
    const command = new AddPermissionCommand(params)
    const msgSent = await sqsClient.send(command)
    console.log(msgSent);
} catch (error) {
    console.log(error)
}}

sendMessageToQueue()

