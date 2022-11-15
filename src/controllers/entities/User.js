import UserSchema from '../../services/db/models/UserSchema';
import Emailer from '../entities/Emailer';

export default class User {

    constructor(data) {
        this.data = data;
        this.name = data.name;
        this.lastname = data.lastname;
        this.id = data.id;
        this.email = data.email;
    }

    static async create(userId) {
        const data = await UserSchema.findById(userId);
        if (!data) {
            throw new Error('User not found');
        }

        return new User(data);
    }

    getFullname() {
        return `${this.name} ${this.lastname}`;
    }

    async notify(notification) {
        const update = this.data.notifications;

        update.quantity = update.quantity + 1;
        update.notifications.push(notification);

        const subject = notification.subject;
        const html = notification.html;

        const emailer = new Emailer(this.email, subject, html);
        await emailer.send();

        await UserSchema.findByIdAndUpdate(this.id, {notifications: update});
    }

}