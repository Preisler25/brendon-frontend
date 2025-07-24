import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import type Ticket from '../types/ticket.ts';

interface CartContextType {
  tickets: Ticket[];
  amount: number;
  deposit: number;
  setDeposit: React.Dispatch<React.SetStateAction<number>>;
  setCart: React.Dispatch<React.SetStateAction<Ticket[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (ticket: Ticket) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextType>({
  tickets: [],
  amount: 0,
  deposit: 0,
  setDeposit: () => {
  },
  setCart: () => {
  },
  setAmount: () => {
  },
  addToCart: () => {
  },
  removeFromCart: () => {
  },
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }: PropsWithChildren) {
  {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [amount, setAmount] = useState<number>(0);
    const [deposit, setDeposit] = useState<number>(0);

    const addToCart = (ticket: Ticket) => {
      const date = new Date();
      const day = date.getDay();
      console.log(day);
      const new_list = [...tickets, ticket];
      const orderByImportance = new_list.sort((a, b) => {
        if (a.importance === b.importance) {
          return 0;
        }
        return a.importance > b.importance ? -1 : 1;
      });
      setTickets(orderByImportance);
      switch (day) {
        case 0:
          setAmount((prev) => prev + ticket.weekend_price);
          break;
        case 6:
          setAmount((prev) => prev + ticket.weekend_price);
          break;
        default:
          setAmount((prev) => prev + ticket.weekday_price);
          break;
      }
      setDeposit((prev) => prev + ticket.deposit);
    };

    const removeFromCart = (index: number) => {
      const date = new Date();
      const day = date.getDay();
      switch (day) {
        case 0:
          setAmount((prev) => prev - tickets[index].weekend_price);
          break;
        case 6:
          setAmount((prev) => prev - tickets[index].weekend_price);
          break;
        default:
          setAmount((prev) => prev - tickets[index].weekday_price);
          break;
      }
      setDeposit((prev) => prev - tickets[index].deposit);
      setTickets((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <CartContext.Provider
        value={{ tickets, amount, deposit, setDeposit, setCart: setTickets, setAmount, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  }
}
