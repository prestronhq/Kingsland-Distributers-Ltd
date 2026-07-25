// App.js - Kingsland Distributors E-commerce (React Router Version)
// Dependencies: npm install lucide-react react-router-dom

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
// Import React Router components
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronRight,
  CrownIcon,
  Truck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Trash2,
  Code,
  Heart,
  ZoomIn,
  Volume2,
  VolumeX,
} from "lucide-react";

// ... (All image imports remain exactly the same) ...
import jwBlueLabel from "./images/Johnnie Walker Blue Label.jpg";
import jwBlackLabel from "./images/Johnnie Walker Black Label 12 Year Old.jpg";
import chivas from "./images/Chivas Regal XV Aged 15 Years.jpg";
import grey from "./images/Grey Goose Vodka.jpg";
import chase from "./images/Clase Azul Tequila Reposado.jpg";
import bombay from "./images/Bombay Sapphire.jpg";
import hennessy from "./images/Hennessy VSOP Privilège Cognac.jpg";
import moet from "./images/Moët & Chandon Ice Impérial .jpg";
import moetB from "./images/Moët & Chandon Brut Impérial.jpg";
import aber from "./images/Aberlour 12 Year Old.jpg";
import glenmorangie from "./images/Glenmorangie The Original 10 Years Old.jpg";
import imperial from "./images/Imperial Blue .jpg";
import jack from "./images/Jack Daniel's Old No. 7 Tennessee Whiskey.jpg";
import jameson from "./images/Jameson Triple Distilled Irish Whiskey.jpg";
import olmeca from "./images/Olmeca Tequila (BlancoReposado).jpg";
import martell from "./images/Martell V.S.O.P..jpg";
import remy from "./images/Rémy Martin VSOP Cognac Fine Champagne.jpg";
import southern from "./images/Southern Comfort Original.jpg";
import veuve from "./images/ Veuve Clicquot Yellow Label Brut.jpg";
import jpc from "./images/JP Chenet Ice.jpg";
import fourth from "./images/4th Street Wine.jpg";
import nederburg from "./images/Nederburg & KWV Wines.jpg";
import heineken from "./images/Heineken Original.jpg";
import savanna from "./images/Savanna Dry.jpg";
import redBull from "./images/Red Bull.jpg";
import heinekenCans from "./images/Heineken.jpg";
import singleton from "./images/The Singleton 18 Year Old.jpg";
import robertson from "./images/Robertson Winery Natural Sweet Wine.jpg";
import malibu from "./images/Malibu .jpg";
import singleton12 from "./images/The Singleton of Dufftown 12, 15, & 18 Year Old.jpg";
import bacardi from "./images/Bacardi Carta Blanca & Superior Gold Rum.jpg";

// ==================== DATA ====================
// ... (All data arrays: products, categories, taglines, heroImages remain the same) ...
const products = [
  {
    id: 1,
    name: "Johnnie Walker Blue Label 100cl",
    badge: "Best Seller",
    category: "whisky",
    image: jwBlueLabel,
    origin: "Scotland",
    abv: "40%",
    description: "A rare, premium blend of some of Scotland's rarest whiskies.",
  },
  {
    id: 2,
    name: "Johnnie Walker Black Label 12 Year 1000ml",
    badge: "Best Seller",
    category: "whisky",
    image: jwBlackLabel,
    origin: "Scotland",
    abv: "40%",
    description:
      "A bolder, smokier interpretation matured in heavily charred casks.",
  },
  {
    id: 3,
    name: "Chivas Regal XV Aged 15 Years",
    category: "whisky",
    image: chivas,
    origin: "Scotland",
    abv: "40%",
    description:
      "A 15-year-old blend finished in Grande Champagne Cognac casks.",
  },
  {
    id: 4,
    name: "Grey Goose Vodka 100cl",
    category: "vodka",
    image: grey,
    origin: "France",
    abv: "40%",
    description: "Premium vodka distilled from soft winter wheat.",
  },
  {
    id: 5,
    name: "Clase Azul Tequila Reposado 750ml",
    badge: "Limited Edition",
    category: "tequila",
    image: chase,
    origin: "Mexico",
    abv: "40%",
    description: "Super-premium tequila aged eight months.",
  },
  {
    id: 6,
    name: "Bombay Sapphire London Dry Gin 100cl",
    category: "gin",
    image: bombay,
    origin: "England",
    abv: "40%",
    description: "Celebrated London Dry Gin with 10 vapor-infused botanicals.",
  },
  {
    id: 7,
    name: "Hennessy VSOP Privilège Cognac",
    category: "cognac",
    image: hennessy,
    origin: "France",
    abv: "40%",
    description: "Aged in French oak with robust vanilla and fruit flavors.",
  },
  {
    id: 8,
    name: "Moët & Chandon Brut 750ml",
    category: "champagne",
    image: moetB,
    origin: "France",
    abv: "12.0%",
    description: "Flagship champagne with bright fruitiness.",
  },
  {
    id: 9,
    name: "Moët & Chandon Ice Impérial",
    category: "champagne",
    image: moet,
    origin: "France",
    abv: "12.0%",
    description: "Flagship champagne with bright fruitiness.",
  },
  {
    id: 10,
    name: "Aberlour 12 Year Old Double Cask Matured",
    category: "whisky",
    image: aber,
    origin: "Scotland",
    abv: "40%",
    description:
      "A Speyside single malt matured in two cask types (traditional oak and sherry) for a rich, fruity, and spicy character.",
  },
  {
    id: 11,
    name: "Glenmorangie The Original 10 Years Old 100cl",
    category: "Whisky",
    image: glenmorangie,
    origin: "Scotland",
    abv: "40-43%",
    description:
      "A classic Highland single malt aged in ex-Bourbon barrels, celebrated for its gentle, citrus, and vanilla notes.",
  },
  {
    id: 12,
    name: "Imperial Blue Superior Grain Whisky 75cl",
    category: "Whisky",
    image: imperial,
    origin: "India",
    abv: "42.8%",
    description:
      "A popular Indian blended whisky containing both Indian grain spirits and imported Scotch malts.",
  },
  {
    id: 13,
    name: "Jack Daniel's Whiskey 100cl",
    category: "whiskey",
    image: jack,
    origin: "United States",
    abv: "40%",
    description:
      "A classic American whiskey mellowed through sugar maple charcoal before aging, giving it a distinctive smooth finish.",
  },
  {
    id: 14,
    name: "Jameson Triple Distilled Irish Whiskey",
    category: "whiskey",
    image: jameson,
    origin: "Ireland",
    abv: "40%",
    description:
      "A flagship Irish whiskey, triple-distilled for exceptional smoothness and noted for its sweet, spicy, and nutty profile.",
  },
  {
    id: 15,
    name: "Olmeca Tequila (Blanco/Reposado)",
    category: "tequila",
    image: olmeca,
    origin: "Mexico",
    abv: "35-40%",
    description:
      "A Tequila from the Jalisco highlands, made with traditional methods, offering vibrant agave flavor perfect for cocktails.",
  },
  {
    id: 16,
    name: "Martell VSOP Cognac 100cl",
    category: "cognac",
    image: martell,
    origin: "France",
    abv: "40%",
    description:
      "A Very Superior Old Pale (VSOP) Cognac known for its subtle balance of sweet and spicy notes with a soft, rounded mouthfeel.",
  },
  {
    id: 17,
    name: "Rémy Martin VSOP Cognac Fine Champagne",
    category: "cognac",
    image: remy,
    origin: "France",
    abv: "40%",
    description:
      "A VSOP exclusively made with eaux-de-vie from the Petite and Grande Champagne crus, offering a rich, elegant, and complex taste.",
  },
  {
    id: 18,
    name: "Southern Comfort Original 1000ml",
    category: "liqueur",
    image: southern,
    origin: "United States",
    abv: "30-35%",
    description:
      "A unique, spiced, fruit-flavored liqueur that has a whiskey base, known for its sweet, distinct, and comforting flavor.",
  },
  {
    id: 19,
    name: "Veuve Clicquot Yellow Label Brut 750ml",
    category: "champagne",
    image: veuve,
    origin: "France",
    abv: "12.0%",
    description:
      "A renowned non-vintage Champagne known for its iconic yellow label, Pinot Noir dominance, and a balance of strength and silkiness.",
  },
  {
    id: 20,
    name: "JP Chenet Ice",
    category: "sparkling wine",
    image: jpc,
    origin: "France",
    abv: "11%",
    description:
      "A French sparkling wine designed for serving over ice, characterized by its refreshing and fruit-forward profile.",
  },
  {
    id: 21,
    name: "4th Street Wine 75cl",
    category: "wine",
    image: fourth,
    origin: "South Africa",
    abv: "8-12%",
    description:
      "A range of sweet, accessible, and often fruit-flavored wines popular for casual drinking.",
  },
  {
    id: 22,
    name: "Nederburg Wines 750ml",
    category: "still wine",
    image: nederburg,
    origin: "South Africa",
    abv: "11-14%",
    description:
      "A well-known South African producer offering a variety of still and sparkling wines across different varietals.",
  },
  {
    id: 23,
    name: "Heineken Original",
    category: "beer",
    image: heineken,
    origin: "Netherlands",
    abv: "5.0%",
    description:
      "A globally recognized Dutch pale lager known for its crisp, clean, and refreshing taste.",
  },
  {
    id: 24,
    name: "Savanna Dry Premium Cider 330ml",
    category: "cider",
    image: savanna,
    origin: "South Africa",
    abv: "6%",
    description:
      "A popular, crisp, and dry apple cider from South Africa, often served with a wedge of lemon in the bottle neck.",
  },
  {
    id: 25,
    name: "Red Bull Energy Drink 250ml",
    category: "energy drink",
    image: redBull,
    origin: "Austria",
    abv: "0.0%",
    description:
      "A non-alcoholic energy drink known for its functional blend of caffeine, taurine, and B vitamins.",
  },
  {
    id: 26,
    name: "Heineken Cans 500ml",
    category: "beer",
    image: heinekenCans,
    origin: "Netherlands",
    abv: "5.0%",
    description:
      "A globally recognized Dutch pale lager known for its crisp, clean, and refreshing taste.",
  },
  {
    id: 27,
    name: "The Singleton of Dufftown 18 Years",
    category: "whisky",
    image: singleton,
    origin: "Scotland",
    abv: "40%",
    description:
      "A range of Speyside single malts known for being smooth, rich, and balanced, matured in a mix of European and American oak.",
  },
  {
    id: 28,
    name: "Robertson Winery Natural Sweet Wine 750ml",
    category: "still wine",
    image: robertson,
    origin: "South Africa",
    abv: "8.0-12.5%",
    description:
      "An accessible, sweet wine, highly popular in South Africa, known for being light, fruity, and perfect for easy, chilled drinking.",
  },
  {
    id: 29,
    name: "Malibu Caribbean Rum with Coconut Liqueur 100cl",
    category: "liqueur",
    image: malibu,
    origin: "Barbados",
    abv: "21%",
    description:
      "A popular, sweet, and low-ABV coconut-flavored liqueur made with Caribbean rum, a key ingredient in many tropical cocktails.",
  },
  {
    id: 30,
    name: "The Singleton of Dufftown 12 & 15",
    category: "whisky",
    image: singleton12,
    origin: "Scotland",
    abv: "40%",
    description:
      "A range of Speyside single malts known for being smooth, rich, and balanced, matured in a mix of European and American oak.",
  },
  {
    id: 31,
    name: "Bacardi Carta Blanca (Superior White Rum) & (Superior Gold Rum) 100cl",
    category: "rum",
    image: bacardi,
    origin: "Puerto Rico (Originally Cuba)",
    abv: "40%",
    description:
      "The iconic, light-bodied, and highly versatile white rum, aged in white oak barrels. It features subtle notes of vanilla, almonds, and bright citrus. It is primarily designed for use in classic cocktails like the Mojito and Daiquiri.",
  },
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "whisky", name: "Whisky" },
  { id: "vodka", name: "Vodka" },
  { id: "gin", name: "Gin" },
  { id: "tequila", name: "Tequila" },
  { id: "cognac", name: "Cognac" },
  { id: "champagne", name: "Champagne" },
  { id: "wine", name: "Wine" },
  { id: "beer", name: "Beer" },
  { id: "cider", name: "Cider" },
  { id: "liqueur", name: "Liqueur" },
  { id: "rum", name: "Rum" },
  { id: "energy drink", name: "Energy Drink" },
  { id: "still wine", name: "Still Wine" },
  { id: "sparkling wine", name: "Sparkling Wine" },
];

const taglines = [
  "Discover the world's finest spirits, meticulously selected",
  "From Scotland's highlands to Mexico's agave fields",
  "Experience luxury in every sip",
  "Curated excellence for unforgettable moments",
];

const heroImages = [
  "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1920&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80",
  "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1920&q=80",
  "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=1920&q=80",
  "https://images.unsplash.com/photo-1608885890658-25e8a1fb8c37?w=1920&q=80",
];

// ==================== STYLES ====================
const StyleInjector = React.memo(() => (
  <style>{`
    .animate-fillBottle { animation: fill 2s linear infinite; }
    @keyframes fill {
      0% { height: 0%; opacity: 0.5; }
      50% { height: 50%; opacity: 1; }
      100% { height: 100%; opacity: 0.5; }
    }
    .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero-bg-layer {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: opacity 1.5s ease-in-out;
      will-change: opacity;
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
));

// ==================== LOADING ANIMATION ====================
const LoadingAnimation = React.memo(() => (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative w-32 h-48 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-amber-600 rounded-t-lg rounded-b-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-amber-600 rounded-b-3xl animate-fillBottle"></div>
      </div>
      <p className="text-amber-400 text-xl font-serif">
        Loading Premium Spirits...
      </p>
    </div>
  </div>
));

// ==================== ISOLATED HERO COMPONENT ====================
// This component manages its own state and NEVER triggers parent re-renders
const HeroSection = React.memo(({ onNavigate }) => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Isolated tagline and image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Isolated parallax scroll - only affects this component
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background images with isolated crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="hero-bg-layer"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentHeroImage === index ? 1 : 0,
              transform:
                currentHeroImage === index
                  ? `translateY(${scrollY * 0.5}px)`
                  : "none",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-950/70 to-black/80"></div>

      <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif text-amber-100 mb-4">
            Curated Excellence
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 mb-8 font-light transition-opacity duration-1000">
            {taglines[currentTagline]}
          </p>
          <button
            onClick={() => onNavigate("products")}
            className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

// ==================== MAIN APP ====================
const LuxurySpiritsWebsite = () => {
  // --- Navigation State (Replaced) ---
  // const [currentPage, setCurrentPage] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // --- Age Verification State ---
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Shopping state
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Feature state
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Computed values
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems]
  );

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kingsland_wishlist");
    if (saved) setWishlist(JSON.parse(saved));

    // Initialize featured products
    setTimeout(() => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 3));
      setIsLoading(false);
    }, 1500);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("kingsland_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Optimized cart functions
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        // Use .map() to return a new array with the updated item
        return prev.map((item, i) => {
          if (i === existingIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`✓ ${product.name} added to cart!`);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const isInList = prev.some((item) => item.id === product.id);
      if (isInList) {
        alert("Removed from wishlist");
        return prev.filter((item) => item.id !== product.id);
      }
      alert("❤️ Added to wishlist!");
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  // Optimized search
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return "";
    return input
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") // Remove <script> tags
      .replace(/[<>"'&]/g, (match) => {
        // Basic HTML entity encoding for quotes and angle brackets
        switch (match) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case '"':
            return "&quot;";
          case "'":
            return "&#39;";
          case "&":
            return "&amp;";
          default:
            return match;
        }
      });
  };

  // Optimized search - now uses sanitization
  const handleSearchChange = useCallback((query) => {
    // 1. Sanitize the input before setting state or using it
    const sanitizedQuery = sanitizeInput(query);
    setSearchQuery(sanitizedQuery);

    // ... rest of the logic remains the same, using sanitizedQuery if needed ...
    

    if (sanitizedQuery.length > 0) {
      const suggestions = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(sanitizedQuery.toLowerCase())
        )
        .slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      
    }
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Navigation callback for Hero (and other components)
  const handleNavigation = useCallback(
    (path) => {
      // Ensure the path is correct (e.g., "/products" not "products")
      navigate(path.startsWith("/") ? path : `/${path}`);
    },
    [navigate]
  );

  // ==================== QUICK VIEW MODAL ====================
  const QuickViewModal = React.memo(({ product, onClose }) => {
    const [selectedImage] = useState(0);
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const productImages = [product.image, product.image];

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-gradient-to-br from-amber-900/40 to-black border border-amber-800/50 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-amber-800/30 p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-serif text-amber-100">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="text-amber-300 hover:text-amber-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <div
                ref={imageRef}
                className="relative bg-amber-950/20 rounded-lg overflow-hidden mb-4 cursor-zoom-in"
                onMouseEnter={() => setIsImageZoomed(true)}
                onMouseLeave={() => setIsImageZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain transition-transform duration-200"
                  style={
                    isImageZoomed
                      ? {
                          transform: `scale(2)`,
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        }
                      : {}
                  }
                />
                {isImageZoomed && (
                  <div className="absolute top-4 right-4 bg-amber-600/80 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                  {product.category}
                </span>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-amber-300 text-sm mb-2">
                      {product.origin} • {product.abv}
                    </p>
                    
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="p-2 rounded-full hover:bg-amber-800/30 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-amber-400"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-amber-200 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  QuickViewModal.displayName = "QuickViewModal";

  // ==================== AGE VERIFICATION ====================
  const AgeVerification = React.memo(() => (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-900 to-amber-950 p-8 md:p-12 rounded-lg max-w-md w-full text-center shadow-2xl border border-amber-700">
        <div className="mb-6">
          <Shield className="w-16 h-16 mx-auto text-amber-400 mb-4" />
          <h2 className="text-3xl font-serif text-amber-100 mb-2">
            Age Verification
          </h2>
          <p className="text-amber-200 text-sm">
            You must be 18 years or older to enter this site
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setIsAgeVerified(true)}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            I am 18 or Older - Enter
          </button>
          <button
            onClick={() => (window.location.href = "https://www.google.com")}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-4 rounded-lg transition-all duration-300"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  ));

  // ==================== NAVIGATION ====================
  const Navigation = React.memo(() => {
    // Get navigation and location from the parent scope (LuxurySpiritsWebsite)
    // This is possible because the component is defined within that scope.

    // Define navigation links
    const navLinks = [
      { name: "Home", path: "/" },
      { name: "Collection", path: "/products" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ];

    const mobileNavLinks = [
      { name: "Home", path: "/" },
      { name: "Collection", path: "/products" },
      { name: "Wishlist", path: "/wishlist" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ];

    return (
      <nav className="bg-black bg-opacity-90 backdrop-blur-md fixed w-full z-40 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <CrownIcon className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-serif text-amber-100">
                Kingsland Distributors
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`font-medium capitalize transition-colors ${
                    location.pathname === link.path
                      ? "text-amber-400" // Active
                      : "text-amber-100" // Inactive
                  } hover:text-amber-400`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-amber-100 hover:text-amber-400 transition-colors hidden md:block"
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="relative text-amber-100 hover:text-amber-400 transition-colors hidden md:block"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative text-amber-100 hover:text-amber-400 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-amber-100"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-amber-900/30">
            <div className="px-4 py-4 space-y-3">
              {mobileNavLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 capitalize ${
                    location.pathname === link.path
                      ? "text-amber-400" // Active
                      : "text-amber-100" // Inactive
                  } hover:text-amber-400`}
                >
                  {link.name}{" "}
                  {link.path === "/wishlist" && `(${wishlist.length})`}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  });

  // ==================== HOME PAGE ====================
  const HomePage = React.memo(() => (
    <div className="animate-fadeIn">
      <HeroSection onNavigate={handleNavigation} />

      <div className="bg-gradient-to-b from-black to-amber-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-amber-100 text-center mb-12">
            Featured Selection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-shadow duration-300 group"
              >
                <div className="h-72 overflow-hidden bg-amber-950/20 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-semibold ${
                        product.badge === "Best Seller"
                          ? "bg-green-600 text-white"
                          : "bg-purple-600 text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="bg-black/60 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-black/60 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-amber-100 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-amber-300 text-sm mb-3">
                    {product.origin} • {product.abv}
                  </p>
                  <p className="text-amber-200 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center gap-3">
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-amber-100 text-center mb-16">
            The Kingsland Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <CrownIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">
                Curated Selection
              </h3>
              <p className="text-amber-300">
                Every bottle handpicked by certified sommeliers and spirits
                experts
              </p>
            </div>

            <div className="text-center">
              <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">
                Authenticity Guaranteed
              </h3>
              <p className="text-amber-300">
                100% authentic products with certificates of origin
              </p>
            </div>

            <div className="text-center">
              <Truck className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">
                Premium Delivery
              </h3>
              <p className="text-amber-300">
                White-glove service with temperature-controlled shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  // ==================== PRODUCTS PAGE ====================
  const ProductsPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">
          Our Collection
        </h1>
        <p className="text-amber-300 text-center mb-12 max-w-2xl mx-auto">
          Explore our carefully curated selection of the world's most
          prestigious spirits
        </p>

        {/* Unified Search & Filter Section */}
        <div className="max-w-5xl mx-auto mb-12 space-y-8">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Try 'whisky under 200k' or search by name..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => {
                  if (searchQuery.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full bg-black/80 backdrop-blur-sm border border-amber-800/50 rounded-xl pl-12 pr-4 py-4 text-amber-100 placeholder-amber-600/70 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
              />

              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-black/95 backdrop-blur-md border border-amber-800/50 rounded-xl overflow-hidden z-50 shadow-2xl shadow-black">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSearchQuery(product.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center space-x-4 p-4 hover:bg-amber-900/30 transition-all border-b border-amber-900/20 last:border-0"
                    >
                      <div className="p-2 bg-white/5 rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-10 object-contain drop-shadow-md"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-amber-100 font-medium">{product.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-12 before:bg-gradient-to-r before:from-black before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-12 after:bg-gradient-to-l after:from-black after:to-transparent after:z-10">
            <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 pb-4 pt-2 snap-x justify-start md:justify-center scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-none snap-center px-8 py-3 rounded-full font-medium transition-all duration-300 uppercase tracking-wider text-sm ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-105 border-transparent"
                      : "bg-black/50 text-amber-300 hover:bg-amber-900/40 hover:text-amber-100 border border-amber-800/50 hover:border-amber-500/50 backdrop-blur-sm"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 group"
            >
              <div className="h-72 overflow-hidden bg-amber-950/20 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-semibold ${
                      product.badge === "Best Seller"
                        ? "bg-green-600 text-white"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="bg-black/70 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-black/70 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                  {product.category}
                </span>
                <h3 className="text-2xl font-semibold text-amber-100 mb-2">
                  {product.name}
                </h3>
                <p className="text-amber-300 text-sm mb-3">
                  {product.origin} • {product.abv}
                </p>
                <p className="text-amber-200 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center gap-3">
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  // ==================== WISHLIST PAGE ====================
  const WishlistPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">
          Your Wishlist
        </h1>
        <p className="text-amber-300 text-center mb-12">
          Save your favorite spirits for later
        </p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-amber-500 mx-auto mb-6" />
            <p className="text-amber-300 text-xl mb-8">
              Your wishlist is empty
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-shadow duration-300"
              >
                <div className="h-72 overflow-hidden bg-amber-950/20 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-amber-100 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-amber-300 text-sm mb-3">
                    {product.origin} • {product.abv}
                  </p>
                  <p className="text-amber-200 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center gap-3">
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ));

  // ==================== CART PAGE ====================
  const CartPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-12">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 text-amber-500 mx-auto mb-6" />
            <p className="text-amber-300 text-xl mb-8">Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain bg-amber-950/20 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-amber-100 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-amber-300 text-sm mb-2">
                      {item.origin} • {item.abv}
                    </p>
                    <p className="text-amber-400 text-xs uppercase">
                      {item.category}
                    </p>

                    <div className="flex items-center space-x-3 mt-3">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            setCartItems((prev) =>
                              prev.map((item, i) => {
                                if (i === index) {
                                  // Return a new object for the item we're updating
                                  return {
                                    ...item,
                                    quantity: item.quantity - 1,
                                  };
                                }
                                return item;
                              })
                            );
                          }
                        }}
                        className="bg-amber-800 hover:bg-amber-700 text-white w-8 h-8 rounded"
                      >
                        -
                      </button>
                      <span className="text-amber-100 font-semibold">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => {
                          setCartItems((prev) =>
                            prev.map((item, i) => {
                              if (i === index) {
                                // Return a new object for the item we're updating
                                return { ...item, quantity: item.quantity + 1 };
                              }
                              // Return all other items unchanged
                              return item;
                            })
                          );
                        }}
                        className="bg-amber-800 hover:bg-amber-700 text-white w-8 h-8 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-400 hover:text-red-300 flex items-center space-x-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6 flex justify-between items-center">
              <span className="text-2xl font-serif text-amber-100">
                Total Items:
              </span>
              <span className="text-3xl font-bold text-amber-400">
                {cartCount}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  ));

  CartPage.displayName = "CartPage";

  // ==================== CHECKOUT PAGE ====================
  const CheckoutPage = React.memo(() => {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    

    const handlePlaceOrder = () => {
      if (
        !customerName ||
        !customerEmail ||
        !customerPhone ||
        !customerAddress
      ) {
        alert("Please fill in all fields");
        return;
      }

      const orderMessage = `*New Order - Kingsland Distributors*\n\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Address:* ${customerAddress}\n\n*Items:*\n${cartItems
        .map(
          (item) => `• ${item.name} (x${item.quantity || 1})`
        )
        .join("\n")}`;

      const whatsappNumber = "256706119011";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        orderMessage
      )}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif text-amber-100 text-center mb-12">
            Checkout
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-amber-300 text-xl mb-8">Your cart is empty</p>
              <button
                onClick={() => navigate("/products")}
                className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
                <h2 className="text-2xl font-serif text-amber-100 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start pb-4 border-b border-amber-800/30"
                    >
                      <div className="flex-1">
                        <h3 className="text-amber-100 font-semibold">
                          {item.name}{" "}
                          <span className="text-amber-300">
                            (x{item.quantity || 1})
                          </span>
                        </h3>
                        <p className="text-amber-400 text-sm">
                          {item.category}
                        </p>
                      </div>
                      
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-amber-800/30">
                  <div className="flex justify-between items-center text-xl">
                    <span className="text-amber-100 font-semibold">Total:</span>
                    <span className="text-amber-400 font-bold">
                      UGX {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
                <h2 className="text-2xl font-serif text-amber-100 mb-6">
                  Customer Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">
                      Delivery Address
                    </label>
                    <textarea
                      rows={3}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                    ></textarea>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 mt-4 rounded-lg font-semibold transition-colors"
                  >
                    Place Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });

  CheckoutPage.displayName = "CheckoutPage";

  // ==================== ABOUT & CONTACT PAGES ====================
  const AboutPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-8">
          Our Story
        </h1>
        <div className="space-y-8 text-amber-200">
          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">
              A Legacy of Excellence
            </h2>
            <p className="leading-relaxed mb-4">
              Founded in 2010, Kingsland Distributors was born from a passion
              for exceptional craftsmanship and bringing the world's finest
              spirits to discerning collectors.
            </p>
            <p className="leading-relaxed">
              Our journey began with a simple mission: to curate an unparalleled
              collection of rare and prestigious bottles.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">
              Our Philosophy
            </h2>
            <p className="leading-relaxed mb-4">
              We believe that every great spirit deserves to be appreciated,
              understood, and celebrated. Our expert team travels the globe to
              forge relationships with master distillers.
            </p>
            <p className="leading-relaxed">
              Each bottle in our collection is authenticated, stored in optimal
              conditions, and delivered with care.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">
              Our Commitment
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CrownIcon className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Authenticity guaranteed on every product</span>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Expert guidance from certified sommeliers</span>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span>Climate-controlled storage and shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  AboutPage.displayName = "AboutPage";

  const ContactPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">
          Get In Touch
        </h1>
        <p className="text-amber-300 text-center mb-12">
          We'd love to hear from you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
            <Phone className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Phone</h3>
            <p className="text-amber-300">
              +256 757 042 420 / +256 782 100 805
            </p>
            <p className="text-amber-400 text-sm mt-1">Mon-Fri: 9AM-6PM EAT</p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/3L0 rounded-lg p-6">
            <Mail className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Email</h3>
            <p className="text-amber-300">kingslanddistributors.ug@gmail.com</p>
            <p className="text-amber-400 text-sm mt-1">
              We respond within 24 hours
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6 md:col-span-2">
            <MapPin className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">
              Location
            </h3>
            <p className="text-amber-300">
              6th Street Industrial Area, Kampala
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
          <h2 className="text-2xl font-serif text-amber-100 mb-6">
            Send us a Message
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We will contact you soon.");
              e.target.reset();
            }}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-200 mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-amber-200 mb-2 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ));

  // ==================== FOOTER ====================
  const Footer = () => (
    <footer className="bg-black border-t border-amber-900/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CrownIcon className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-serif text-amber-100">
                Kingsland Distributors
              </span>
            </div>
            <p className="text-amber-300 text-sm">
              Curating the world's finest spirits for the discerning
              connoisseur.
            </p>
          </div>
          <div>
            <h4 className="text-amber-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-amber-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-amber-400"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-amber-400"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-amber-400"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-100 font-semibold mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li>
                <button
                  type="button"
                  className="hover:text-amber-400 text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-amber-400 text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-amber-400 text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-amber-400 text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-100 font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <Facebook className="w-6 h-6 text-amber-400 hover:text-amber-300 cursor-pointer" />
              <Instagram className="w-6 h-6 text-amber-400 hover:text-amber-300 cursor-pointer" />
              <Twitter className="w-6 h-6 text-amber-400 hover:text-amber-300 cursor-pointer" />
            </div>
            <div className="mt-6 pt-6 border-t border-amber-800/30">
              <div className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer">
                <Code className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-semibold">Crafted by</span>
              </div>
              <p className="text-amber-300 text-sm font-bold mt-1">
                Code Sphere Web Solutions
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-900/30 pt-8 text-center">
          <p className="text-amber-400 text-sm">
            © 2025 Kingsland Distributors. All rights reserved. Drink
            Responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
  // ==================== PAGE ROUTER (Removed) ====================
  if (!isAgeVerified) {
    return <AgeVerification />;
  }
  /* // This function is no longer needed
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      // ... etc
    }
  };
  */

  // ==================== MAIN RENDER ====================
  return (
    <div className="bg-black min-h-screen">
      <StyleInjector />
      {isLoading && <LoadingAnimation />}
      <Navigation />

      {/* Main content area is now controlled by React Router */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<HomePage />} /> {/* Fallback to home */}
        </Routes>
      </main>

      <Footer />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-amber-800 z-40">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center justify-center flex-1"
          >
            <CrownIcon
              className={`w-6 h-6 ${
                location.pathname === "/" ? "text-amber-500" : "text-amber-300"
              }`}
            />
            <span className="text-xs text-amber-300 mt-1">Home</span>
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex flex-col items-center justify-center flex-1"
          >
            <Search
              className={`w-6 h-6 ${
                location.pathname === "/products"
                  ? "text-amber-500"
                  : "text-amber-300"
              }`}
            />
            <span className="text-xs text-amber-300 mt-1">Shop</span>
          </button>
          <button
            onClick={() => navigate("/wishlist")}
            className="flex flex-col items-center justify-center flex-1 relative"
          >
            <Heart
              className={`w-6 h-6 ${
                location.pathname === "/wishlist"
                  ? "text-amber-500"
                  : "text-amber-300"
              }`}
            />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-6 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <span className="text-xs text-amber-300 mt-1">Saved</span>
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="flex flex-col items-center justify-center flex-1 relative"
          >
            <ShoppingCart
              className={`w-6 h-6 ${
                location.pathname === "/cart"
                  ? "text-amber-500"
                  : "text-amber-300"
              }`}
            />
            {cartCount > 0 && (
              <span className="absolute top-0 right-6 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs text-amber-300 mt-1">Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxurySpiritsWebsite;
