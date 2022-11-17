import { User } from '../../../services/db/models/User'

export type GoogleProfile = Pick<User, 'name' | 'lastname' | 'image' | 'email'>
