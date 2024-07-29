import { useContext} from "react";
import MealItem from  "./MealItem"
import BackEndContext from "./api/BackEndContext.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";


const requestConfig = {};
function Meals() {
  const {backEndURL, imageBackEndURL} = useContext(BackEndContext);

  const {data , error, isLoading} = useHttp(`${backEndURL}/meals`, requestConfig, []);

  if(isLoading){
    <p className="center">Feching meals....</p>
  }

  if(!data){
    return <p>No meals found.</p>
  }

  if(error){
    return <Error title="Failed to fetch meals" message={error} />;
  }


  console.log(data);

  return (
    <ul id="meals">
      {data.map((meal) => (
         <MealItem key={meal.id} meal={meal} imageBackEndURL={imageBackEndURL}/>
      ))}
    </ul>
  );
}

export default Meals;
