# 🍕 Dishcovery - Modern Food Ordering App

A beautiful, production-ready food ordering web application inspired by Swiggy and Zomato. Built with React, featuring a stunning UI, authentication system, shopping cart, and restaurant browsing functionality.

![React](https://img.shields.io/badge/React-18.0+-blue?style=flat-square&logo=react)
![Parcel](https://img.shields.io/badge/Parcel-2.0+-green?style=flat-square)
![SCSS](https://img.shields.io/badge/SCSS-3.0+-pink?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ✨ Features

### 🔐 **Authentication System**

- User signup & login with form validation
- Frontend-only authentication (no backend required)
- Persistent user sessions with localStorage
- Beautiful gradient UI for login/signup forms

### 🛒 **Shopping Cart**

- Add items from restaurant menus
- Adjust quantities dynamically
- Remove items with one click
- Cart persists across page reloads
- Real-time bill calculations (subtotal, taxes, delivery charges)

### 🏪 **Restaurant Browsing**

- Browse all restaurants with cards
- Search and filter restaurants
- View detailed restaurant menus
- Category-based menu organization
- Star ratings and delivery times

### 💎 **Premium UI/UX**

- Modern gradient design (Dishcovery colors)
- Smooth animations and transitions
- Responsive mobile-friendly layout
- Loading shimmer effects
- Glass-morphism effects

### 📱 **Navigation**

- Multi-page routing with React Router
- Active tab indicators in header
- Scroll-to-top on page navigation
- Offline status indicator

---

## 🛠️ Tech Stack

| Category               | Technologies                      |
| ---------------------- | --------------------------------- |
| **Frontend Framework** | React 18+ (Functional Components) |
| **Routing**            | React Router v6                   |
| **State Management**   | React Context API                 |
| **Styling**            | SCSS (Custom, no Tailwind)        |
| **Bundler**            | Parcel 2.0                        |
| **Form Validation**    | Formik + Yup                      |
| **HTTP Client**        | Fetch API                         |
| **Icons**              | React Icons                       |
| **Data Source**        | Swiggy API (live data)            |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── About/             # About page component
│   ├── Body/              # Home/landing page
│   ├── Cart/              # Shopping cart page
│   ├── Contact/           # Contact page
│   ├── Error/             # Error page
│   ├── Footer/            # Footer component
│   ├── Header/            # Navigation header
│   ├── Login/             # Login/signup forms
│   ├── RestaurantCard/    # Restaurant list item
│   ├── RestaurantMenu/    # Restaurant menu page
│   ├── ShimmerUI/         # Loading skeleton
│   └── ...
├── utils/
│   ├── AuthContext.js     # Authentication state management
│   ├── CartContext.js     # Shopping cart state management
│   ├── constants.js       # App constants & design tokens
│   ├── mockUsers.js       # Mock user database
│   └── hooks/
│       ├── useOnlineStatus.js      # Network status hook
│       ├── useRestaurantData.js    # Fetch restaurants hook
│       └── useRestaurantMenuData.js # Fetch menu hook
├── App.js                 # Root routing component
├── index.css              # Global styles
└── index.html             # HTML entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/iamumangj/umang-react
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm start
```

The app will open at `http://localhost:1234`

---

## 📖 Usage Guide

### 🔑 Login Credentials (Demo)

```
Email:    john@example.com (or jane@example.com or test@example.com)
Password: password123
```

**Live URL:** `https://umang-react-lilac.vercel.app/`

## 🔐 Authentication

The app uses **frontend-only authentication** with:

- Mock user database in `utils/mockUsers.js`
- Session persistence via localStorage
- No backend API required
- Easily replaceable with real backend

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📋 Future Enhancements

- [ ] Real backend with Node.js/Express
- [ ] Database integration (MongoDB)
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Order tracking system
- [ ] User profile page
- [ ] Favorites/Wishlist
- [ ] Reviews and ratings
- [ ] Admin dashboard
- [ ] Real-time order notifications
- [ ] Multiple delivery addresses

---

## 👨‍💻 Author

**Umang Joshi**

- Linkedin: https://www.linkedin.com/in/umang-joshi-28191417b/
- Email: umangjoshi1221@gmail.com

---

## 🙏 Acknowledgments

- Inspired by Swiggy and Zomato
- Built as part of Namaste React course
- Thanks to the React community
- API data from Swiggy

---

## 📞 Support

If you have any questions or issues:

1. Check the documentation above
2. Open an issue on GitHub
3. Contact the author

---

## 🎉 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Test authentication with demo credentials
- [ ] Add items to cart
- [ ] Share with friends!

---

**Made with ❤️ by Umang Joshi | Happy Coding! 🚀**
