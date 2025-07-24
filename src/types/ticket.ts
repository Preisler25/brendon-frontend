export default interface Ticket {
  id: number;
  name: string;
  weekend_price: number;
  weekday_price: number;
  deposit: number;
  rental_id?: string;
  importance: number;
}
