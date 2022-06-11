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
    uid: string;
    customer: UserNameSpace.User;
  }
}
