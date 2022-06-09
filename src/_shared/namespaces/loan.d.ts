namespace OrderNameSpace {
  interface Order {
    title: string;
    bookingDate: string;
    address: {
      city: string;
      street: string;
      zip: string;
      country: string;
    };
    actual_amount: number;
    customer: UserNameSpace.User;
  }
}
