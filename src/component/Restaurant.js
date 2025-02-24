import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import { Menu_url} from "../utils/constant"
import { useParams } from "react-router-dom"
import useRestrauntMenu from "../utils/useRestaurantMenu"
import RestaurantCategory from "./RestaurantCategory"

const RestaurantMenu=()=>{


    const {resId}=useParams()

    const resInfo=useRestrauntMenu(resId)

    const[showIndex,setShowIndex]=useState(null)


    if (resInfo===null) return <Shimmer/>


   const {name,cuisines, costForTwoMessage}=resInfo?.cards[0]?.card?.card?.info

   const {itemCards}=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card


const Category=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((c) => c.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory')

// console.log(Category)




return(
    <div className="text-center">
        <h1 className="font-bold my-6 text-2xl">{name}</h1>
        <p className="font-bold text-lg">{cuisines.join(",")}-{costForTwoMessage}</p>
        <div>
        {Category.map((category,index)=>(
            <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card}
            showItems={index === showIndex? true :false}
            setShowIndex={()=>setShowIndex(index)}/>
        ))}
        </div>
    </div>
)

}
export default RestaurantMenu