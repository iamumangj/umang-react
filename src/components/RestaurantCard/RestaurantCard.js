import { Link } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { IMG_CDN_URL, COLORS } from "../../utils/constants";
import "./RestaurantCard.scss";

const RestaurantCard = ({
  id,
  cloudinaryImageId,
  name,
  areaName,
  sla,
  cuisines,
  costForTwo,
  avgRating,
}) => {
  return (
    <Link to={`/restaurants/${id}`} className="restaurant-card">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className="restaurant-logo"
      />
      <div className="restaurant-details">
        <h3 className="restaurant-name">
          {name.slice(0, 22)}
          {name.length > 22 ? "..." : ""}
        </h3>
        <div className="esa-rating">
          <h4 className="rating">
            <MdStarRate
              className="rating-logo"
              style={
                avgRating > 4.2
                  ? { backgroundColor: COLORS.green }
                  : { backgroundColor: COLORS.red }
              }
            />
            <span>{avgRating}</span>
          </h4>
          <h4>{costForTwo}</h4>
          <h4>{sla.deliveryTime} mins</h4>
        </div>
        <p className="cousine">
          {cuisines.join(", ").slice(0, 30)}
          {cuisines.join(", ").length > 30 ? "..." : ""}
        </p>
        <p className="location">{areaName}</p>
      </div>
    </Link>
  );
};

// Higher Order Component (HOC) for RestaurantCard with discount
// Input - RestaurantCard
// Output - RestaurantCard with discount offer if available else normal RestaurantCard
export const withDiscountOffer = (RestaurantCard) => {
  return (props) => {
    const { aggregatedDiscountInfoV3 } = props;

    return (
      <div className="restaurant-card-with-discount">
        {aggregatedDiscountInfoV3 && (
          <div className="discount-badge">
            {aggregatedDiscountInfoV3.header}{" "}
            {aggregatedDiscountInfoV3.subHeader}
          </div>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
