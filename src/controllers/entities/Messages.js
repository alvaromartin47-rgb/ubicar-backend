export default class Messages {

    static reserveTrip(displayName, from, to) {
        return `¡${displayName} quiere viajar con vos de ${from} a ${to}!`;
    }

    static ERROR_PAYMENT_RESERVE_PENDING() {
        return "Before making the payment, the driver must accept your reservation"
    }

}