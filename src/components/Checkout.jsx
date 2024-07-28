import { useContext } from "react";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
import Input from "./ui/Input.jsx";
import Modal from "./ui/Modal.jsx";
import { currencyFormatter } from "./utils/formatting";
import Button from "./ui/Button.jsx";
import BackEndContext from "./api/BackEndContext";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";
import success from "../assets/success.svg"


const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const { backEndURL } = useContext(BackEndContext);

  const { data, error, isLoading:isSending, sendRequest, clearData } = useHttp(
    `${backEndURL}/orders`,
    requestConfig
  );

  const cartTotal = cartContext.items.reduce((totalPrice, item) => {
    return item.price * item.quantity + totalPrice;
  }, 0);

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  function handleFinish(){
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();

  }

  function onSubmitForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  let errorTag = "";


  if(error){
    errorTag = <Error title="Failed to submit order" message={error} />;
  }

  if(isSending){
    actions = <span>Sending order data...</span>;
  }




  if(data && !error){
    return <Modal open={userProgressContext.progress === "checkout"} onClose={handleFinish}>
      <img src={success} alt="Success" className="center"/>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p><b>Order Number: </b>{data.orderId}</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }

  return (
    <Modal
      className="check-out"
      open={userProgressContext.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={onSubmitForm}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {errorTag}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
