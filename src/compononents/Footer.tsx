import { useCart } from '../context/cartContext.tsx';
import { useKassza } from '../context/kasszaContext.tsx';

function Footer() {
  const { deposit, tickets, amount, setCart, setAmount, setDeposit, removeFromCart } = useCart();
  const { kassza } = useKassza();

  const handlePayment = async (isCash: boolean) => {
    const groupedTickets = tickets.reduce((acc, ticket) => {
      const key = `${ticket.id}-${isCash}`;
      acc[key] = acc[key] || { id: ticket.id, quantity: 0, payed_in_cash: isCash };
      acc[key].quantity += 1;
      return acc;
    }, {} as Record<string, { id: number; quantity: number; payed_in_cash: boolean }>);

    const payload = {
      cashierId: kassza,
      tickets: Object.values(groupedTickets),
      totalAmount: amount,
      totalDeposit: deposit,
    };

    try {
      const res = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok) {
        setCart([]);
        setAmount(0);
        setDeposit(0);
      }
    } catch (e) {
      alert('Hálózati hiba!');
    }
  };

  // Jegyek csoportosítása név és darabszám szerint
  const grouped = tickets.reduce((acc, ticket, index) => {
    if (!acc[ticket.name]) {
      acc[ticket.name] = { count: 0, firstIndex: index };
    }
    acc[ticket.name].count += 1;
    return acc;
  }, {} as Record<string, { count: number; firstIndex: number }>);

  return (
    <div
      className="flex flex-col items-center justify-between bg-gray-800 text-white p-4 w-[20vw]"
    >
      <div className="flex flex-col h-[85vh] overflow-scroll select-none w-full">
        {Object.entries(grouped).map(([name, group]) => (
          <div
            key={name}
            onClick={() => removeFromCart(group.firstIndex)}
            className="cursor-pointer hover:bg-gray-700 p-1"
            title="Kattints egy jegy törléséhez"
          >
            {name} - {group.count}
          </div>
        ))}
      </div>
      <div>Fizetendo: {amount} - ft</div>
      <div>Letet: {deposit} - ft</div>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
          onClick={() => handlePayment(false)}
        >
          Fizetés kártya
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => handlePayment(true)}
        >
          Fizetés készpénz
        </button>
      </div>
    </div>
  );
}

export default Footer;
