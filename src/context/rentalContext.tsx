import type Rental from '../types/rental.ts';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

interface RentalContextType {
  rentals: Rental[];
  getRentals: () => void;
  setRentals: React.Dispatch<React.SetStateAction<Rental[]>>;
  addRental: (rental: Rental) => void;
  removeRental: (id: string) => void;
  updateRental: (id: string, updatedRental: Partial<Rental>) => void;
}

const RentalContext = createContext<RentalContextType>({
  rentals: [],
  getRentals: () => {
  },
  setRentals: () => {
  },
  addRental: () => {
  },
  removeRental: () => {
  },
  updateRental: () => {
  },
});

export const useRental = () => useContext(RentalContext);

export default function RentalContextProvider({ children }: PropsWithChildren) {
  const [rentals, setRentals] = useState<Rental[]>([]);

  const getRentals = async () => {

    const res = await fetch('http://localhost:3000/rentals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data.status === 200) {
      setRentals(data.data);
    } else {
      console.error('Failed to fetch rentals:', data.message);
    }
  };

  const addRental = async (rental: Rental) => {
    const res = await fetch('http://localhost:3000/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rental),
    });

    const data = await res.json();
    if (data.status === 200) {
      await getRentals();
    } else {
      console.error('Failed to add rental:', data.message);
    }

  };

  const removeRental = async (id: string) => {
    const res = await
      fetch(`http://localhost:3000/rentals/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const data = await res.json();
    if (data.status === 200) {
      await getRentals();
    } else {
      console.error('Failed to remove rental:', data.message);
    }
  };

  const updateRental = async (id: string, updatedRental: Partial<Rental>) => {
    const res = await fetch(`http://localhost:3000/rentals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRental),
    });
    const data = await res.json();
    if (data.status === 200) {
      await getRentals();
    } else {
      console.error('Failed to update rental:', data.message);
    }
  };

  return (
    <RentalContext.Provider value={{ rentals, getRentals, setRentals, addRental, removeRental, updateRental }}>
      {children}
    </RentalContext.Provider>
  );
};


