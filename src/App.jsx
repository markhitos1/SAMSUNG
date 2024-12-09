import React, { useState } from "react";
import { FaSearch, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaShoppingCart } from "react-icons/fa";

const SamsungProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Galaxy S23 Ultra",
      category: "Mobile",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
    },
    {
      id: 2,
      name: "Galaxy Tab S9+",
      category: "Tablet",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764"
    },
    {
      id: 3,
      name: "Galaxy Book3 Pro",
      category: "Notebook",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },
    {
      id: 4,
      name: "Samsung Desktop PC",
      category: "PC",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Updated with simplified menu */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold">Samsung</span>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <FaShoppingCart className="text-2xl" />
                  <span className="ml-1">{cart.length}</span>
                </button>
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4">
                    {cart.length === 0 ? (
                      <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div className="ml-2">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <p className="font-medium">Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the component remains unchanged */}
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Tablet">Tablet</option>
            <option value="PC">PC</option>
            <option value="Notebook">Notebook</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
                <li><a href="#" className="hover:text-blue-400">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Returns Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <FaFacebook className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaLinkedin className="text-2xl hover:text-blue-400 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SamsungProductsPage;