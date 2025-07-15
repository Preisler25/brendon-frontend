import {createContext} from "react";

interface Cart {
    id: string;
}

interface Kassza {
    token: string;
    cart: Cart;
    TimeOfLoggingIn: number;
}

const kasszaContext = createContext<Kassza | undefined>(undefined)