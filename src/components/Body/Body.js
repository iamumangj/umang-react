import { useState } from "react";
import RestaurantCard, {
  withDiscountOffer,
} from "../RestaurantCard/RestaurantCard";
import RestroCard from "../ShimmerUI/RestroCard";
import useRestaurantData from "../../utils/hooks/useRestaurantData";
import useOnlineStatus from "../../utils/hooks/useOnlineStatus";
import UserOffline from "../UserOffline/UserOffline";
import "./Body.scss";

const Body = () => {
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);

  const isOnline = useOnlineStatus();

  const [restaurantList, filteredRestaurants, setFilteredRestaurants] =
    useRestaurantData();

  // HOC for RestaurantCard with discount offer
  const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard);

  console.log(restaurantList);

  const handleSearch = () => {
    const filtered = restaurantList.filter((res) =>
      res.info.name.toLowerCase().includes(searchRestaurant.toLowerCase()),
    );

    setFilteredRestaurants(filtered);
    setSearchRestaurant(""); // Clear the search input box after search
    setRestaurantName(searchRestaurant);
  };

  const handleTopRated = () => {
    if (!isTopRated) {
      const topRated = restaurantList.filter(
        (res) => res.info.avgRating >= 4.4,
      );
      setFilteredRestaurants(topRated);
      setRestaurantName("Top Rated");
    } else {
      setFilteredRestaurants(restaurantList);
      setRestaurantName("");
    }

    setIsTopRated(!isTopRated);
  };

  const showAllRestaurants = () => {
    setFilteredRestaurants(restaurantList);
    setRestaurantName("");
    setIsTopRated(false);
  };

  if (!isOnline) {
    return <UserOffline />;
  }

  // Conditional rendering using ternary operator
  return restaurantList.length === 0 ? (
    <RestroCard />
  ) : (
    <div className="body-wrapper">
      <div className="top-search">
        <div className="search-box">
          <input
            type="text"
            value={searchRestaurant}
            onChange={(e) => setSearchRestaurant(e.target.value)}
            placeholder="search a restaurant you want..."
          />
          <button className="search" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="top-rated" onClick={handleTopRated}>
          {isTopRated ? "Show All Restaurants" : "Top Rated Restaurants"}
        </button>
      </div>

      <div className="restaurant-container">
        {filteredRestaurants.length !== 0 &&
          filteredRestaurants.map((restaurant) => {
            // If restaurant has discount offer then show discount offer
            return restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurantCardWithDiscount
                key={restaurant?.info?.id}
                {...restaurant?.info}
              />
            ) : (
              <RestaurantCard
                key={restaurant?.info?.id}
                {...restaurant?.info}
              />
            );
          })}
      </div>
      {filteredRestaurants?.length === 0 && (
        <div className="no-results-wrapper">
          <div className="no-results">
            <h2>No Results Found 🍽️</h2>
            We couldn’t find any restaurant for <span>"{restaurantName}"</span>
            <button onClick={showAllRestaurants}>Show All Restaurants</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
