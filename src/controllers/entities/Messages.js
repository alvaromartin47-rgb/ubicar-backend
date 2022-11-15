export default class Messages {

    static reserveTrip(displayName, from, to) {
        return `¡${displayName} quiere viajar con vos de ${from} a ${to}!`;
    }

    static ERROR_PAYMENT_RESERVE_PENDING() {
        return "Before making the payment, the driver must accept your reservation"
    }

    static ERROR_RESERVE_NOT_EXIST() {
        return "The reservation does not exist";
    }

    static ERROR_RESERVATION_WAS_ALREADY_ACCEPT() {
        return "Reservation was alredy accept";
    }

    static ERROR_RESERVATION_ALREADY_EXISTS() {
        return "A reservation already exists";
    }

    static ERROR_TRAVELER_IS_DRIVER() {
        return "You can't book your own trip";
    }
}