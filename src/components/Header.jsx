import logo from "../assets/logo.jpg"
import Button from "./ui/Button";
import { useContext } from "react";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";


function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNoOfItems, item) =>{
      return totalNoOfItems + item.quantity;
  },0);

  return (
    <>
      <div id="main-header">
        <div id="title">
          <img src={logo} alt="app logo" />
          <h1>Food App</h1>
        </div>
        <nav>
          <Button textOnly onClick={() => {userProgressContext.showCart()}}>Cart ({totalCartItems})</Button>
        </nav>
      </div>
    </>
  );
}

export default Header;
