import type Ticket from '../types/ticket.ts';
import { createContext, useContext, useState } from 'react';

interface TicketContextType {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  getTickets: () => void;
}

const TicketContext = createContext<TicketContextType>({
  tickets: [],
  setTickets: () => {
  },
  getTickets: () => {
  },
});

export const useTickets = () => useContext(TicketContext);

export default function TicketsContextProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getTickets = async () => {
    const res = await fetch('http://localhost:3000/tickets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.data.length > 0) {
      const sortedTickets = data.data.sort((a: Ticket, b: Ticket) => {
        if (a.importance === b.importance) {
          return 0;
        }
        return a.importance > b.importance ? -1 : 1;
      });
      setTickets(sortedTickets);
      console.log('Tickets fetched successfully:', data.data);
      console.log(data.data);
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, setTickets, getTickets }}>
      {children}
    </TicketContext.Provider>
  );
}
