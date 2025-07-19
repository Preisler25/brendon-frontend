import { type Context, createContext, type PropsWithChildren, useContext, useState } from 'react';
import type Ticket from '../types/ticket.ts';

interface CartContextType {
  tickets: Ticket[];
  amount: number;
  setCart: React.Dispatch<React.SetStateAction<Ticket[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (ticket: Ticket) => void;
}

const CartContext = createContext<CartContextType>({
  tickets: [],
  amount: 0,
  setCart: () => {
  },
  setAmount: () => {
  },
  addToCart: () => {

  },
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }: PropsWithChildren) {
  {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [amount, setAmount] = useState<number>(0);

    const addToCart = (ticket: Ticket) => {
      setTickets((prev) => [...prev, ticket]);
      setAmount((prev) => prev + ticket.weekday_price); // or ticket.price if you want total cost
    };

    return (
      <CartContext.Provider value={{ tickets, amount, setCart: setTickets, setAmount, addToCart }}>
        {children}
      </CartContext.Provider>
    );
  }
}
