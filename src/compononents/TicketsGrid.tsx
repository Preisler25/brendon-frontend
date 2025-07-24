import { useTickets } from '../context/ticketContext.tsx';
import CircularProgress from '@mui/joy/CircularProgress';
import Grid from '@mui/joy/Grid';
import { useEffect } from 'react';
import TicketElement from './Ticket.tsx';

function TicketsGrid() {
  const { tickets, getTickets } = useTickets();
  useEffect(() => {
    getTickets();
  }, []);

  if (tickets.length === 0) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <div className='w-[80vw]'>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid key={ticket.id} xs={12} sm={6} md={4} lg={3}>
            <TicketElement id={ticket.id} name={ticket.name} weekend_price={ticket.weekend_price}
                           weekday_price={ticket.weekday_price} deposit={ticket.deposit}
                           importance={ticket.importance} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TicketsGrid;
