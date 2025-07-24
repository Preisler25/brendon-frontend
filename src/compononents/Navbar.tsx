import { useKassza } from '../context/kasszaContext.tsx';
import TicketEditor from './ticketEditor.tsx';
import RentalEditor from './rentalEditor.tsx';

export function Navbar() {
  const { kassza, name, logout } = useKassza();
  return (
    <div className="flex flex-row items-center justify-between bg-gray-800 text-white p-4">
      <div>
        Brendon Kassza {kassza}
      </div>
      <div>
        Üdvözöllek, {name}!
      </div>
      <div>
        <TicketEditor />
        <RentalEditor />
      </div>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Kijelentkezés
        </button>
      </div>
    </div>
  );
}

export default Navbar;
