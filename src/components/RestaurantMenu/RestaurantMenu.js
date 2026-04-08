import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { MdStarRate } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import RestroCard from "../ShimmerUI/RestroCard";
import { IMG_CDN_URL, COLORS } from "../../utils/constants";
import useRestaurantMenuData from "../../utils/hooks/useRestaurantMenuData";
import { useCart } from "../../utils/CartContext";
import "./RestaurantMenu.scss";

const MenuItem = memo(({ item, restaurantInfo, IMG_CDN_URL }) => {
  const i = item.card.info;
  const { cartItems, addToCart, updateQuantity } = useCart();

  const itemInCart = cartItems.find((cartItem) => cartItem.id === i.id);
  const quantity = itemInCart?.quantity || 0;

  const handleAdd = () => {
    addToCart({
      id: i.id,
      name: i.name,
      price: i.price / 100 || i.defaultPrice / 100,
      image: IMG_CDN_URL + i.imageId,
      restaurant: restaurantInfo.name,
    });
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      updateQuantity(i.id, quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      updateQuantity(i.id, quantity - 1);
    }
  };

  return (
    <div className="menu-items">
      <div className="left">
        <h2>{i.name}</h2>
        <h4>₹{i.price / 100 || i.defaultPrice / 100}</h4>
        <p>{i.description?.slice(0, 60)}</p>
        <span className="rating">
          <MdStarRate
            className="rating-logo"
            style={{
              backgroundColor: i.avgRating >= 4 ? COLORS.green : COLORS.red,
            }}
          />
          {i.avgRating || i.ratings?.avgRating || "4.0"}
        </span>
      </div>
      <div className="right">
        <img src={IMG_CDN_URL + i.imageId} />
        {quantity === 0 ? (
          <button className="add-btn" onClick={handleAdd}>
            ADD
          </button>
        ) : (
          <div className="counter">
            <button onClick={() => handleQuantityChange("decrement")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange("increment")}>+</button>
          </div>
        )}
      </div>
    </div>
  );
});

const TabButton = memo(({ idx, title, isActive, onClick }) => (
  <button key={idx} className={isActive ? "active-tab" : ""} onClick={onClick}>
    {title}
  </button>
));

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate();
  const restaurantInfo = useRestaurantMenuData(resId);
  const { totalItems } = useCart();

  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const info = useMemo(
    () => restaurantInfo?.cards[2]?.card?.card?.info || {},
    [restaurantInfo],
  );

  const cards = useMemo(
    () =>
      restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [],
    [restaurantInfo],
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offsets = cards.map((_, idx) => {
            const el = document.getElementById(`cat-${idx}`);
            return el ? el.offsetTop : 0;
          });

          const scrollY = window.scrollY + 150;
          const index = offsets.findIndex(
            (offset, i) =>
              scrollY >= offset && scrollY < (offsets[i + 1] || Infinity),
          );

          if (index !== -1) setActiveTab(index);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards]);

  if (!restaurantInfo) return <RestroCard />;

  return (
    <div className="menu">
      <div className="restaurant-header">
        <img src={IMG_CDN_URL + info.cloudinaryImageId} alt={info.name} />
        <div className="restaurant-header-details">
          <h1>{info.name}</h1>
          <h3>{info.locality}</h3>
          <p>{info.cuisines?.join(", ")}</p>

          <div className="rating-time">
            <div className="rating">
              <MdStarRate
                className="rating-logo"
                style={{
                  backgroundColor:
                    info.avgRating >= 4 ? COLORS.green : COLORS.red,
                }}
              />
              <span>{info.avgRatingString}</span>
            </div>
            <span>|</span>
            <span>{info.sla?.slaString}</span>
          </div>
        </div>
      </div>

      <div className="sticky-tabs">
        {cards.map((c, idx) => {
          const title = c?.card?.card?.title;
          if (!title) return null;

          return (
            <TabButton
              key={idx}
              idx={idx}
              title={title}
              isActive={activeTab === idx}
              onClick={() =>
                document
                  .getElementById(`cat-${idx}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          );
        })}
      </div>

      {cards.map((categoryCard, idx) => {
        const items = categoryCard?.card?.card?.itemCards || [];
        const title = categoryCard?.card?.card?.title;

        if (!items.length) return null;

        return (
          <div key={idx} className="menu-category" id={`cat-${idx}`}>
            <div
              className="category-header"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <h3>{title}</h3>
              <span>{openIndex === idx ? "▲" : "▼"}</span>
            </div>

            {openIndex === idx && (
              <div className="category-body">
                {items.map((item) => (
                  <MenuItem
                    key={item.card.info.id}
                    item={item}
                    restaurantInfo={info}
                    IMG_CDN_URL={IMG_CDN_URL}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {totalItems > 0 && (
        <div className="floating-cart">
          🛒 {totalItems} items added
          <button onClick={() => navigate("/cart")}>View Cart</button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
