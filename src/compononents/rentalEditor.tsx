import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { API_URL } from '../lib/utils';

function RentalEditor() {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [max_amount, setMaxAmount] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  const handleClick = async () => {
    if (name.trim() === '' || max_amount < 0 || active < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }


    const res = await fetch(`${API_URL}/rentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        max_amount,
        active,
      }),
    });
    const data = await res.json();

    if (data.status === 200) {
      console.log(data);
    }
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add new rental
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add new rental</DialogTitle>
          <DialogContent>Itt tudsz uj berlemenyt letrehozni</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Berlemeny</FormLabel>
                <Input autoFocus required value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }} />
              </FormControl>
              <FormControl>
                <FormLabel>A max darabszam</FormLabel>
                <Input required type="number" value={max_amount}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setMaxAmount(Number(event.target.value));
                       }} />
              </FormControl>
              <FormControl>
                <FormLabel>Aktiv darabszam</FormLabel>
                <Input required type="number" value={active}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setActive(Number(event.target.value));
                       }} />
              </FormControl>
              <Button type="submit" onClick={handleClick}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default RentalEditor;
