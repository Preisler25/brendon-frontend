import type Ticket from '../types/ticket.ts';
import { useCart } from '../context/cartContext.tsx';

function ListElement(ticket: Ticket, index: number) {
  const { removeFromCart } = useCart();
  const handelClick = () => {
    removeFromCart(index);
  };
  return (
    <div key={index} onClick={handelClick} className="w-full">
      {ticket.name}
    </div>
  );
}

export default ListElement;
