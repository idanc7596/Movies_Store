import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "./Components/Menu";
import Search from "./Components/Search";
import Discover from "./Components/Discover";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import NotFound from "./Components/NotFound";

const API_KEY = "daf1a2793627a2c1bd618e44be26f98e";
export const Context = React.createContext();

const App = () => {
    const [cartMovies, setCartMovies] = useState([]);

    return (
        <Context.Provider value={{cartMovies, setCartMovies}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />}>
                        <Route index element={<Search apiKey={API_KEY} />}/>
                        <Route path="/discover" element={<Discover apiKey={API_KEY} />}/>
                        <Route path="/cart" element={<Cart />}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
