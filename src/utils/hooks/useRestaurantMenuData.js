import { useEffect, useState } from "react";
import { MENU_API_URL } from "../../utils/constants";

const useRestaurantMenuData = (resId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const fetchMenusData = async () => {
    try {
      const response = await fetch(MENU_API_URL + resId, {
        credentials: "include",
      });

      const json = await response.json();
      console.log(json);

      setRestaurantInfo(json?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMenusData();
  }, []);

  return restaurantInfo;
};

export default useRestaurantMenuData;
