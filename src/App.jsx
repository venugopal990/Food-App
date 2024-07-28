import { BackEndContextProvider } from "./components/api/BackEndContext.jsx";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/UserProgressContext.jsx";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <BackEndContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </BackEndContextProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
