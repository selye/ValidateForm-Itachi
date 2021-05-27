import { createApp } from 'vue'
import Message from '../components/Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeOut = 2000) => {
 const messageInstance = createApp(Message, {
     message,
     type
 })
 const montNode = document.createElement('div')
 document.body.appendChild(montNode)
 messageInstance.mount(montNode)
 setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(montNode)
 }, timeOut)
}

export default createMessage
