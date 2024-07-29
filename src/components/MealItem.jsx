import { currencyFormatter } from "./utils/formatting";
import Button from "./ui-components/Button";
import { useContext } from "react";
import CartContext from "./store/CartContext";


function MealItem(props){
    const cartCtx = useContext(CartContext);
    const meal = props.meal;

    function handleAddmealToCart(){
        cartCtx.addItem(meal);
    }
    return(

        <li className="meal-item">
            <article>

                <img src={`${props.imageBackEndURL}/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price) }</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddmealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>

    );
}


export default MealItem;