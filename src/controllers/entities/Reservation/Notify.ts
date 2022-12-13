import User from '../User/User'
import Reserve from './Reserve'
import { Notification } from '../../../services/db/models/Notification'

export interface Notify {

  notify: (userNotificated: User, reservation: Reserve) => Promise<Notification>

}
