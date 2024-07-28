import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "./utils/formatting";
import Button from "./ui/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItems from "./CartItems";


function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce((totalPrice,item) =>{
    return item.price*item.quantity + totalPrice;
  },0);

function handleCloseCart(){
  userProgressContext.hideCart()
}  

  
  return (
    <Modal className="cart" open={userProgressContext.progress === 'cart'} onClose={userProgressContext.progress === 'cart'? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItems item={item} key={item.id} onIncrease={()=>{cartContext.addItem(item)}}
          onDecrease={()=>{cartContext.removeItem(item.id)}}/>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartContext.items.length>0 ? (
        <Button onClick={() =>{userProgressContext.showCheckout()}}>Go to Checkout</Button>
        ) : null}
      </p>
    </Modal>
  );
}

export default Cart;
