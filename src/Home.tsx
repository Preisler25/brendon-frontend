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
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';


import { Key, Person, ShoppingBasketTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useKassza } from './context/kasszaContext.tsx';
import { API_URL } from './lib/utils.ts';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [kassza, setKasszaS] = React.useState<number>(1);
  const [name, setNameS] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [value, setValue] = React.useState<string[]>(['Kassza1']);

  const { setKassza, setName, setToken } = useKassza();

  const navigate = useNavigate();

  const handleKasszaChange = (value: number) => {
    if (value === 1) {
      value = 1;
    } else if (value === 2) {
      value = 2;
    } else {
      value = kassza;
    }
    setKasszaS(value);
  };

  const hangleLogin = async () => {
    console.log('login');
    if (name.trim() === '' || password.trim() === '') {
      alert('Kérlek add meg a neved és a jelszavad!');
      return;
    }
    if (value.length === 0) {
      alert('Kérlek válassz kasszát!');
      return;
    }
    const res = await fetch(
      `${API_URL}/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kassza: kassza,
          name: name,
          password: password,
        }),
      },
    );
    const data = await res.json();
    console.log('Response:', data);

    if (data.status !== 200) {
      alert(data.message);
      return;
    }
    if (data.status === 200 && data.data.length === 0) {
      alert('Hiba történt a bejelentkezés során. Kérlek próbáld újra.');
      return;
    }

    if (data.status === 200 && data.data.length > 0) {
      setKassza(kassza);
      setName(name);
      setToken(data.data[0]);
      localStorage.setItem('kassza', kassza.toString());
      localStorage.setItem('name', name);
      localStorage.setItem('token', data.data[0]);
      console.log('Login successful:', data.data[0]);
      navigate('/home');
    }

    // Here you can handle the login logic, e.g., API call
    console.log(`Logged in as ${name} on Kassza ${kassza}`);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="flex justify-center items-center h-screen">
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Person />}
          onClick={() => setOpen(true)}
        >
          Login
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Brendon</DialogTitle>
          <DialogContent>Add meg az adataida a bejelentkezeshez</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={3}>
              <div>
                <FormLabel>Kassza szama </FormLabel>
                <List
                  variant="outlined"
                  aria-label="Screens"
                  role="group"
                  orientation="horizontal"
                  sx={{
                    flexGrow: 0,
                    '--List-gap': '8px',
                    '--List-padding': '8px',
                    '--List-radius': '8px',
                  }}
                >
                  {['Kassza1', 'Kassza2'].map((item) => (
                    <ListItem key={item}>
                      <ListItemDecorator
                        sx={[
                          {
                            zIndex: 2,
                            pointerEvents: 'none',
                          },
                          value.includes(item) && { color: 'text.primary' },
                        ]}
                      >
                        {
                          {
                            Kassza1: <ShoppingBasketTwoTone />,
                            Kassza2: <ShoppingBasketTwoTone />,
                          }[item]
                        }
                      </ListItemDecorator>
                      <Checkbox
                        disableIcon
                        overlay
                        label={item}
                        checked={value.includes(item)}
                        color="neutral"
                        variant={value.includes(item) ? 'outlined' : 'plain'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          if (event.target.checked) {
                            setValue([item]);
                            handleKasszaChange(item === 'Kassza1' ? 1 : 2);
                          } else {
                            setValue((val) => val.filter((text) => text !== item));
                          }
                        }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: {
                              bgcolor: checked ? 'background.level1' : 'transparent',
                              boxShadow: checked ? 'sm' : 'none',
                            },
                          }),
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              <FormControl>
                <FormLabel>Neved</FormLabel>
                <Input startDecorator={<Person />} required value={name}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setNameS(event.target.value);
                       }} />
              </FormControl>
              <FormControl>
                <FormLabel>Jelszo</FormLabel>
                <Input required startDecorator={<Key />} type="password" value={password}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setPassword(event.target.value);
                       }} />
              </FormControl>
              <Button type="submit" onClick={hangleLogin}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
