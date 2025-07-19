import { Link } from 'react-router';
import CartContextProvider from './context/cartContext.tsx';

export default function Home() {
  return (
    <>
      <CartContextProvider>
        <div>oHme</div>
        <Link to="/">Concerts</Link>
      </CartContextProvider>
    </>
  );
}
