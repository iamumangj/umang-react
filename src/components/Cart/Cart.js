import { useNavigate } from "react-router-dom";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "../../utils/CartContext";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = 30;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryCharge + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-wrapper">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="continue-btn" onClick={() => navigate("/")}>
            Continue Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Your Cart</h1>
          <p className="cart-items-count">{totalItems} items</p>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            <h2 className="section-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100?text=Food";
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="restaurant">{item.restaurant}</p>
                  <p className="price">₹{item.price}</p>
                </div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <MdRemove />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <MdAdd />
                  </button>
                </div>

                <div className="item-total">
                  <p>₹{item.price * item.quantity}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <h2 className="section-title">Bill Details</h2>
            <div className="bill-details">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge}</span>
              </div>
              <div className="bill-row">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="bill-divider"></div>
              <div className="bill-row total">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
