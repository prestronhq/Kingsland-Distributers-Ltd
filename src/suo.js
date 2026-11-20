<div className="h-72 overflow-hidden bg-amber-950/20 relative">
                  <img src={product.image} alt={product.name} 
                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  {product.badge && (
                    <span className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-semibold ${
                      product.badge === "Best Seller" ? "bg-green-600 text-white" : "bg-purple-600 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button onClick={() => toggleWishlist(product)} 
                            className="bg-black/60 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors">
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button onClick={() => setQuickViewProduct(product)} 
                            className="bg-black/60 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-amber-100 mb-2">{product.name}</h3>
                  <p className="text-amber-300 text-sm mb-3">{product.origin} • {product.abv}</p>
                  <p className="text-amber-200 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-2xl font-bold text-amber-400">{product.price}</span>
                    <button onClick={() => addToCart(product)} 
                            className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
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
          <h2 className="text-4xl font-serif text-amber-100 text-center mb-16">The Kingsland Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">Curated Selection</h3>
              <p className="text-amber-300">Every bottle handpicked by certified sommeliers</p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">Authenticity Guaranteed</h3>
              <p className="text-amber-300">100% authentic products with certificates</p>
            </div>
            <div className="text-center">
              <Truck className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-100 mb-3">Premium Delivery</h3>
              <p className="text-amber-300">White-glove service with temperature control</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  HomePage.displayName = 'HomePage';

  // ==================== PRODUCTS PAGE ====================
  const ProductsPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">Our Collection</h1>
        <p className="text-amber-300 text-center mb-12 max-w-2xl mx-auto">
          Explore our carefully curated selection of the world's most prestigious spirits
        </p>

        <div className="max-w-2xl mx-auto mb-8 space-y-6">
          <div>
            <label className="block text-amber-200 mb-2 text-sm">
              Price Range: UGX {priceRange[0].toLocaleString()} - UGX {priceRange[1].toLocaleString()}
            </label>
            <input type="range" min="0" max="1000000" step="10000" value={priceRange[1]} 
                   onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} 
                   className="w-full h-2 bg-amber-800 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input type="text" placeholder="Try 'whisky under 200k' or search by name..." 
                   value={searchQuery} 
                   onChange={(e) => handleSearchChange(e.target.value)} 
                   onFocus={() => { if (searchQuery.length > 0) setShowSuggestions(true); }} 
                   onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
                   className="w-full bg-black border border-amber-800 rounded-lg pl-12 pr-4 py-3 text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600" />

            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-amber-800 rounded-lg overflow-hidden z-10">
                {searchSuggestions.map((product) => (
                  <button key={product.id} 
                          onClick={() => { setSearchQuery(product.name); setShowSuggestions(false); }} 
                          className="w-full flex items-center space-x-3 p-3 hover:bg-amber-900/20 transition-colors">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                    <div className="text-left flex-1">
                      <p className="text-amber-100 text-sm">{product.name}</p>
                      <p className="text-amber-400 text-xs">{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} 
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === cat.id ? "bg-amber-600 text-white" : 
                      "bg-amber-900/20 text-amber-300 hover:bg-amber-800/30 border border-amber-800/30"
                    }`}>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 group">
              <div className="h-72 overflow-hidden bg-amber-950/20 relative">
                <img src={product.image} alt={product.name} 
                     className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-semibold ${
                    product.badge === "Best Seller" ? "bg-green-600 text-white" : "bg-purple-600 text-white"
                  }`}>
                    {product.badge}
                  </span>
                )}
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => toggleWishlist(product)} 
                          className="bg-black/70 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors">
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button onClick={() => setQuickViewProduct(product)} 
                          className="bg-black/70 backdrop-blur-sm hover:bg-amber-600 text-white p-2 rounded-full transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                  {product.category}
                </span>
                <h3 className="text-2xl font-semibold text-amber-100 mb-2">{product.name}</h3>
                <p className="text-amber-300 text-sm mb-3">{product.origin} • {product.abv}</p>
                <p className="text-amber-200 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center gap-3">
                  <span className="text-2xl font-bold text-amber-400">{product.price}</span>
                  <button onClick={() => addToCart(product)} 
                          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
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

  ProductsPage.displayName = 'ProductsPage';

  // ==================== WISHLIST PAGE ====================
  const WishlistPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">Your Wishlist</h1>
        <p className="text-amber-300 text-center mb-12">Save your favorite spirits for later</p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-amber-500 mx-auto mb-6" />
            <p className="text-amber-300 text-xl mb-8">Your wishlist is empty</p>
            <button onClick={() => setCurrentPage("products")} 
                    className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-900/50 transition-shadow duration-300">
                <div className="h-72 overflow-hidden bg-amber-950/20 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  <button onClick={() => toggleWishlist(product)} 
                          className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-amber-800/30 text-amber-400 text-xs rounded-full mb-3 uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-amber-100 mb-2">{product.name}</h3>
                  <p className="text-amber-300 text-sm mb-3">{product.origin} • {product.abv}</p>
                  <p className="text-amber-200 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-2xl font-bold text-amber-400">{product.price}</span>
                    <button onClick={() => addToCart(product)} 
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
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

  WishlistPage.displayName = 'WishlistPage';

  // ==================== CART PAGE ====================
  const CartPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-12">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 text-amber-500 mx-auto mb-6" />
            <p className="text-amber-300 text-xl mb-8">Your cart is empty</p>
            <button onClick={() => setCurrentPage("products")} 
                    className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
                <div className="flex items-start gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-contain bg-amber-950/20 rounded" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-amber-100 mb-2">{item.name}</h3>
                    <p className="text-amber-300 text-sm mb-2">{item.origin} • {item.abv}</p>
                    <p className="text-amber-400 text-xs uppercase">{item.category}</p>

                    <div className="flex items-center space-x-3 mt-3">
                      <button onClick={() => {
                        if (item.quantity > 1) {
                          setCartItems(prev => {
                            const newItems = [...prev];
                            newItems[index].quantity -= 1;
                            return newItems;
                          });
                        }
                      }} className="bg-amber-800 hover:bg-amber-700 text-white w-8 h-8 rounded">-</button>
                      <span className="text-amber-100 font-semibold">{item.quantity || 1}</span>
                      <button onClick={() => {
                        setCartItems(prev => {
                          const newItems = [...prev];
                          newItems[index].quantity = (newItems[index].quantity || 1) + 1;
                          return newItems;
                        });
                      }} className="bg-amber-800 hover:bg-amber-700 text-white w-8 h-8 rounded">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-400 mb-4">{item.price}</p>
                    <button onClick={() => removeFromCart(index)} 
                            className="text-red-400 hover:text-red-300 flex items-center space-x-2">
                      <Trash2 className="w-5 h-5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6 flex justify-between items-center">
              <span className="text-2xl font-serif text-amber-100">Total Items:</span>
              <span className="text-3xl font-bold text-amber-400">{cartCount}</span>
            </div>

            <button onClick={() => setCurrentPage("checkout")} 
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  ));

  CartPage.displayName = 'CartPage';

  // ==================== CHECKOUT PAGE ====================
  const CheckoutPage = React.memo(() => {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const total = cartItems.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

    const handlePlaceOrder = () => {
      if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        alert("Please fill in all fields");
        return;
      }

      const orderMessage = `*New Order - Kingsland Distributors*\n\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Address:* ${customerAddress}\n\n*Items:*\n${cartItems.map(item => `• ${item.name} (x${item.quantity || 1}) - ${item.price}`).join("\n")}\n\n*Total:* UGX ${total.toLocaleString()}`;

      const whatsappNumber = "256761308920";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif text-amber-100 text-center mb-12">Checkout</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-amber-300 text-xl mb-8">Your cart is empty</p>
              <button onClick={() => setCurrentPage("products")} 
                      className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
                <h2 className="text-2xl font-serif text-amber-100 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start pb-4 border-b border-amber-800/30">
                      <div className="flex-1">
                        <h3 className="text-amber-100 font-semibold">
                          {item.name} <span className="text-amber-300">(x{item.quantity || 1})</span>
                        </h3>
                        <p className="text-amber-400 text-sm">{item.category}</p>
                      </div>
                      <p className="text-amber-400 font-bold">{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-amber-800/30">
                  <div className="flex justify-between items-center text-xl">
                    <span className="text-amber-100 font-semibold">Total:</span>
                    <span className="text-amber-400 font-bold">UGX {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
                <h2 className="text-2xl font-serif text-amber-100 mb-6">Customer Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">Full Name</label>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                           className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">Email</label>
                    <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} 
                           className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">Phone Number</label>
                    <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} 
                           className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
                  </div>
                  <div>
                    <label className="block text-amber-200 mb-2 text-sm">Delivery Address</label>
                    <textarea rows={3} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} 
                              className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"></textarea>
                  </div>
                  <button onClick={handlePlaceOrder} 
                          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 mt-4 rounded-lg font-semibold transition-colors">
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

  CheckoutPage.displayName = 'CheckoutPage';

  // ==================== ABOUT & CONTACT PAGES ====================
  const AboutPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-8">Our Story</h1>
        <div className="space-y-8 text-amber-200">
          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">A Legacy of Excellence</h2>
            <p className="leading-relaxed mb-4">
              Founded in 2010, Kingsland Distributors was born from a passion for exceptional craftsmanship and bringing the world's finest spirits to discerning collectors.
            </p>
            <p className="leading-relaxed">
              Our journey began with a simple mission: to curate an unparalleled collection of rare and prestigious bottles.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">Our Philosophy</h2>
            <p className="leading-relaxed mb-4">
              We believe that every great spirit deserves to be appreciated, understood, and celebrated. Our expert team travels the globe to forge relationships with master distillers.
            </p>
            <p className="leading-relaxed">
              Each bottle in our collection is authenticated, stored in optimal conditions, and delivered with care.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-amber-100 mb-4">Our Commitment</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
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

  AboutPage.displayName = 'AboutPage';

  const ContactPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950 to-black pt-24 pb-32 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">Get In Touch</h1>
        <p className="text-amber-300 text-center mb-12">We'd love to hear from you</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
            <Phone className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Phone</h3>
            <p className="text-amber-300">+256 757 042 420 / +256 782 100 805</p>
            <p className="text-amber-400 text-sm mt-1">Mon-Fri: 9AM-6PM EAT</p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6">
            <Mail className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Email</h3>
            <p className="text-amber-300">kingslanddistributors.ug@gmail.com</p>
            <p className="text-amber-400 text-sm mt-1">We respond within 24 hours</p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-6 md:col-span-2">
            <MapPin className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Location</h3>
            <p className="text-amber-300">6th Street Industrial Area, Kampala</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-800/30 rounded-lg p-8">
          <h2 className="text-2xl font-serif text-amber-100 mb-6">Send us a Message</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We will contact you soon."); e.target.reset(); }}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-200 mb-2 text-sm">First Name</label>
                  <input type="text" required className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
                </div>
                <div>
                  <label className="block text-amber-200 mb-2 text-sm">Last Name</label>
                  <input type="text" required className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
                </div>
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">Email</label>
                <input type="email" required className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">Subject</label>
                <input type="text" required className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600" />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 text-sm">Message</label>
                <textarea rows={5} required className="w-full bg-black border border-amber-800 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-600"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-lg font-semibold transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ));

  ContactPage.displayName = 'ContactPage';

  // ==================== FOOTER ====================
  const Footer = React.memo(() => (
    <footer className="bg-black border-t border-amber-900/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-serif text-amber-100">Kingsland Distributors</span>
            </div>
            <p className="text-amber-300 text-sm">Curating the world's finest spirits for the discerning connoisseur.</p>
          </div>
          <div>
            <h4 className="text-amber-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li><button onClick={() => setCurrentPage("home")} className="hover:text-amber-400">Home</button></li>
              <li><button onClick={() => setCurrentPage("products")} className="hover:text-amber-400">Collection</button></li>
              <li><button onClick={() => setCurrentPage("about")} className="hover:text-amber-400">About Us</button></li>
              <li><button onClick={() => setCurrentPage("contact")} className="hover:text-amber-400">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-100 font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li><button type="button" className="hover:text-amber-400 text-left">Shipping Information</button></li>
              <li><button type="button" className="hover:text-amber-400 text-left">Returns & Exchanges</button></li>
              <li><button type="button" className="hover:text-amber-400 text-left">Terms & Conditions</button></li>
              <li><button type="button" className="hover:text-amber-400 text-left">Privacy Policy</button></li>
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
              <p className="text-amber-300 text-sm font-bold mt-1">Code Sphere Web Solutions</p>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-900/30 pt-8 text-center">
          <p className="text-amber-400 text-sm">© 2025 Kingsland Distributors. All rights reserved. Drink Responsibly.</p>
        </div>
      </div>
    </footer>
  ));

  Footer.displayName = 'Footer';

  // ==================== PAGE ROUTER ====================
  if (!isAgeVerified) {
    return <AgeVerification />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage />;
      case "products": return <ProductsPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "wishlist": return <WishlistPage />;
      case "cart": return <CartPage />;
      case "checkout": return <CheckoutPage />;
      default: return <HomePage />;
    }
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="bg-black min-h-screen">
      <StyleInjector />
      {isLoading && <LoadingAnimation />}
      <Navigation />
      <main>{renderPage()}</main>
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
          <button onClick={() => setCurrentPage("home")} className="flex flex-col items-center justify-center flex-1">
            <Award className={`w-6 h-6 ${currentPage === "home" ? "text-amber-500" : "text-amber-300"}`} />
            <span className="text-xs text-amber-300 mt-1">Home</span>
          </button>
          <button onClick={() => setCurrentPage("products")} className="flex flex-col items-center justify-center flex-1">
            <Search className={`w-6 h-6 ${currentPage === "products" ? "text-amber-500" : "text-amber-300"}`} />
            <span className="text-xs text-amber-300 mt-1">Shop</span>
          </button>
          <button onClick={() => setCurrentPage("wishlist")} className="flex flex-col items-center justify-center flex-1 relative">
            <Heart className={`w-6 h-6 ${currentPage === "wishlist" ? "text-amber-500" : "text-amber-300"}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-6 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <span className="text-xs text-amber-300 mt-1">Saved</span>
          </button>
          <button onClick={() => setCurrentPage("cart")} className="flex flex-col items-center justify-center flex-1 relative">
            <ShoppingCart className={`w-6 h-6 ${currentPage === "cart" ? "text-amber-500" : "text-amber-300"}`} />
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