import type Ticket from '../types/ticket.ts';
import { useCart } from '../context/cartContext.tsx';

function TicketElement(ticket: Ticket) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(ticket);
  };
  return (
    <div className="h-[10vw] w-[10vw] bg-cyan-800 flex flex-col justify-center text-center text-zinc-300"
         onClick={handleClick}>
      {ticket.name}
    </div>
  );
}

export default TicketElement;
