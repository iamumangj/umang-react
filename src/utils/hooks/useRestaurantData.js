import { useState, useEffect } from "react";
import { LIST_API_URL } from "../../utils/constants";

const useRestaurantData = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const fetchRestaurantsData = async () => {
    try {
      const response = await fetch(LIST_API_URL);
      const json = await response.json();
      const restaurants =
        json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setRestaurantList(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  return [restaurantList, filteredRestaurants, setFilteredRestaurants];
};

export default useRestaurantData;
