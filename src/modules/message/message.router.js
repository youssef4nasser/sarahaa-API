import express from 'express'
import { addMessage, deleteUserMessage, getUserMessage } from './message.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { addMessageSchema, deleteMessageSchema } from './message.validation.js'
const messageRouter = express.Router()

messageRouter.post('/:userName', validation(addMessageSchema), addMessage)
messageRouter.get('/', auth, getUserMessage)
messageRouter.delete('/:id', auth, validation(deleteMessageSchema), deleteUserMessage)

export default messageRouter
