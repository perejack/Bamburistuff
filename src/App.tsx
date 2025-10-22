import { useState, useEffect } from 'react';
import { X, ArrowUp } from 'lucide-react';
import type { Product, CartItem } from './types';
import { allProducts } from './data/products';
import Carousel from './components/Carousel';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Header from './components/Header';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    // Add product to cart
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Animate cart icon
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 700);
    
    // Open cart after a short delay
    setTimeout(() => setShowCart(true), 300);
  };



  const handleRequestOrder = () => {
    const message = cartItems
      .map(item => `${item.quantity}x ${item.product.name} @ KSh ${item.product.price}`)
      .join('\n');
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const fullMessage = `New Order:\n\n${message}\n\nTotal: KSh ${total}`;
    window.open(`https://wa.me/+254750095397?text=${encodeURIComponent(fullMessage)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        isCartAnimating={isCartAnimating}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <Carousel />

        {/* About Us Section - Side by Side */}
        <section className="mt-8 md:mt-12 flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:w-1/2 w-full h-72 md:h-96 flex items-center justify-center bg-green-50">
            <img
              src="/images/053d5062de1a0354-2.jpeg"
              alt="Bamburi Cement Factory"
              className="object-cover h-72 md:h-96 w-full md:w-auto drop-shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 w-full p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-4">About Bamburi Cement</h2>
            <p className="text-gray-700 text-lg mb-4">
              Bamburi Cement Limited is a Kenyan-based cement manufacturer and a subsidiary of the global Holcim Group. For over 60 years, Bamburi has been a cornerstone of the nation's construction industry, contributing to iconic projects and everyday buildings alike.
            </p>
            <p className="text-gray-600 mb-4">
              We offer a wide range of cement products designed to meet the diverse needs of our customers, from individual home builders to large-scale contractors. Our products are engineered for strength, durability, and superior performance, ensuring that your projects stand the test of time.
            </p>
            <p className="text-green-800 font-semibold">At Bamburi, we are not just making cement; we are building a stronger Kenya.</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Why Choose Bamburi Cement Section */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">Why Choose Bamburi Cement?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg className="w-12 h-12 text-green-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-lg font-bold mb-2 text-green-800">Consistent Quality</h3>
              <p className="text-gray-600 text-center">Industry-leading quality control ensures every bag meets the highest standards.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg className="w-12 h-12 text-green-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-lg font-bold mb-2 text-green-800">Fast & Reliable Delivery</h3>
              <p className="text-gray-600 text-center">Nationwide delivery network gets your cement to you quickly and safely.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg className="w-12 h-12 text-green-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-3.866 0-7 3.134-7 7 0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4 0-3.866-3.134-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-lg font-bold mb-2 text-green-800">Sustainability</h3>
              <p className="text-gray-600 text-center">Committed to eco-friendly production and sustainable construction solutions.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 mb-12 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="mb-6 md:mb-0 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Build with Bamburi?</h2>
            <p className="text-white text-lg">Contact us today for a quote or to place your order. Our team is here to help you every step of the way.</p>
          </div>
          <a href="https://wa.me/+254750095397?text=I%20would%20like%20to%20order%20Bamburi%20Cement" target="_blank" rel="noopener noreferrer" className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-green-50 hover:text-green-900 transition-all text-lg">
            Get a Quote
          </a>
        </section>

        {/* Cart modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm modal-backdrop" onClick={(e) => {
            if (e.target === e.currentTarget) setShowCart(false);
          }}>
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex justify-end p-4 border-b">
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Cart
                items={cartItems}
                onUpdateQuantity={(id, qty) => {
                  setCartItems(prev =>
                    prev.map(item =>
                      item.product.id === id
                        ? { ...item, quantity: qty }
                        : item
                    )
                  );
                }}
                onRemove={(id) => {
                  setCartItems(prev => prev.filter(item => item.product.id !== id));
                }}
                onRequestOrder={handleRequestOrder}
              />
            </div>
          </div>
        )}
        
        {/* Enhanced Floating WhatsApp button */}
        <a
          href="https://wa.me/+254750095397?text=I%20would%20like%20to%20inquire%20about%20your%20products"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 flex items-center gap-2 bg-white text-gray-800 py-2 px-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 z-40 md:bottom-8 md:right-8 group"
          aria-label="Contact via WhatsApp"
        >
          {/* WhatsApp Icon */}
          <div className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.412-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          
          {/* Text and Online Indicator - Visible on desktop and expanded on mobile hover */}
          <div className="flex flex-col justify-center hidden md:block group-hover:block">
            <div className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
            <span className="font-medium whitespace-nowrap">Talk to us</span>
          </div>
        </a>
        
        {/* Scroll to top button - only visible when scrolled down */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 left-4 bg-white text-green-600 p-3 rounded-full shadow-lg hover:bg-green-50 z-40 transition-all duration-300 animate-fadeIn md:bottom-8 md:left-8"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bamburi Cement</h3>
              <p className="text-gray-400">Your trusted partner for quality building materials in Kenya.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
            
              <p className="text-gray-400">Location: Nairobi, Kenya</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Bamburi Cement. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;