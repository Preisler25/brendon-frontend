import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useRental } from '../context/rentalContext.tsx';
import { useEffect } from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useTickets } from '../context/ticketContext.tsx';

export default function TicketEditor() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [weekendPrice, setWeekendPrice] = React.useState<number>(0);
  const [weekdayPrice, setWeekdayPrice] = React.useState<number>(0);
  const [deposit, setDeposit] = React.useState<number>(0);
  const [importance, setImportance] = React.useState<number>(0);
  const [rentalId, setRentalId] = React.useState<string | undefined>(undefined);

  const { rentals, getRentals } = useRental();
  const { getTickets } = useTickets();
  useEffect(() => {
    getRentals();
  });

  const handleClick = async () => {
    if (name.trim() === '' || weekendPrice < 0 || weekdayPrice < 0 || deposit < 0 || importance < 0) {
      return;
    }

    const response = await fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        weekend_price: weekendPrice,
        weekday_price: weekdayPrice,
        deposit,
        importance,
        rental_id: rentalId,
      }),
    });

    if (response.ok) {
      getTickets();
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add new ticket
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add new ticket</DialogTitle>
          <DialogContent>Itt tudsz uj jegyfajtat hozza adni</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Jegy</FormLabel>
                <Input autoFocus required value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }} />
              </FormControl>
              <FormControl>
                <FormLabel>Hetvegi ar</FormLabel>
                <Input required type="number" value={weekendPrice}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setWeekendPrice(Number(event.target.value));
                       }} />
              </FormControl>
              <FormControl>
                <FormLabel>Hetkoznapi ar</FormLabel>
                <Input required type="number" value={weekdayPrice}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setWeekdayPrice(Number(event.target.value));
                       }} />
              </FormControl>
              <FormControl>
                <FormLabel>Letet</FormLabel>
                <Input required type="number" value={deposit}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setDeposit(Number(event.target.value));
                       }} />
              </FormControl>
              <FormControl>
                <FormLabel>Fontossag</FormLabel>
                <Input required type="number" value={importance}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setImportance(Number(event.target.value));
                       }} />
              </FormControl>
              <Select
                placeholder="Berlemeny …"
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                      transform: 'rotate(-180deg)',
                    },
                  },
                }}
              >
                {rentals.map((data, index) => (
                  <Option
                    key={index}
                    value={data.id}
                    onClick={() => setRentalId(data.id)}
                  >
                    {data.name}
                  </Option>
                ))}
              </Select>

              <Button type="submit" onClick={handleClick}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
