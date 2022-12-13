export default class Messages {
  static reserveTrip (displayName: string, from: string, to: string): string {
    return `¡${displayName} quiere viajar con vos de ${from} a ${to}!`
  }

  static ERROR_PAYMENT_RESERVE_PENDING (): string {
    return 'Before making the payment, the driver must accept your reservation'
  }

  static ERROR_RESERVE_NOT_EXIST (): string {
    return 'The reservation does not exist'
  }

  static ERROR_RESERVATION_WAS_ALREADY_ACCEPT (): string {
    return 'Reservation was alredy accept'
  }

  static ERROR_RESERVATION_ALREADY_EXISTS (): string {
    return 'A reservation already exists'
  }

  static ERROR_TRAVELER_IS_DRIVER (): string {
    return "You can't book your own trip"
  }

  static ERROR_RESERVATION_TOKEN_EXPIRED_OR_INVALID (): string {
    return 'Reservation token is expired or invalid'
  }

  static ERROR_TOKEN_IS_STILL_VALID (): string {
    return 'Access Token is still valid'
  }

  void (): void {}
}
