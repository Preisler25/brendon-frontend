import { useKassza } from './context/kasszaContext.tsx';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Navbar from './compononents/Navbar.tsx';
import TicketsGrid from './compononents/TicketsGrid.tsx';
import Footer from './compononents/Footer.tsx';
import { API_URL } from './lib/utils.ts';

function App() {
  const { setName, setKassza, token, setToken } = useKassza();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (token === '') {
        const storedToken = localStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
          const res = await fetch(`${API_URL}/auth/wait`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: storedToken }),
          });

          const data = await res.json();
          if (data.status === 200 && data.data.length > 0) {
            const user = data.data[0];
            console.log(data);
            setKassza(user.kassza);
            setName(user.name);
            localStorage.setItem('kassza', user.kassza.toString());
            localStorage.setItem('name', user.name);
            navigate('/home');
          }
        } else {
          navigate('/');
        }
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center h-[90.5vh] bg-slate-700
      ">
        <TicketsGrid />
        <Footer />
      </div>
    </>
  );
}

export default App;
