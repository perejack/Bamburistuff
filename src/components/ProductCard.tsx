import { ShoppingCart, MessageCircle, Clock, Award, Heart, Truck } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Random value for offer expiration (14, 21, or 30 days)
  const offerDays = [14, 21, 30][Math.floor(Math.random() * 3)];
  const [liked, setLiked] = useState(false);
  
  // Determine if there's a special offer
  let hasSpecialOffer = false;
  let discount = 0;
  let originalPrice = product.price;

  if (product.originalPrice && product.originalPrice > product.price) {
    // Use the predefined original price from the product data
    hasSpecialOffer = true;
    originalPrice = product.originalPrice;
    discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  } else if (product.category === 'cement' || product.price > 1000) {
    // Fallback to a random discount for items without a predefined original price
    hasSpecialOffer = true;
    discount = Math.floor(Math.random() * 15) + 5; // 5-20% discount
    originalPrice = Math.round(product.price / (1 - discount / 100));
  }
  
  // No countdown timer needed as we're using fixed days

  return (
    <div 
      className={`bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden transform transition-all duration-300 group hover:shadow-2xl ${isHovered ? 'ring-4 ring-green-200' : ''}`}
      style={{ minHeight: 420, width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-110"
        />
        {hasSpecialOffer && (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 rounded-br-lg font-bold">
            {discount}% OFF
          </div>
        )}
        <button 
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-green-100 transition-colors"
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold mb-1 text-green-900 group-hover:text-green-700 transition-colors">{product.name}</h3>
          {product.category === 'cement' && (
            <span className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
              <Award className="w-3 h-3 mr-1" /> Premium
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
        
        {/* Price display with original price if discounted */}
        <div className="flex items-center mb-2">
          <span className="text-2xl font-extrabold text-green-900 mr-2">
            KSh {product.price.toLocaleString()}
          </span>
          {hasSpecialOffer && (
            <span className="text-sm text-gray-400 line-through">
              KSh {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Tags display */}
        {product.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-100 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Urgency and delivery information */}
        <div className="space-y-2 mb-3">
          {hasSpecialOffer && (
            <div className="flex items-center text-amber-600 text-xs font-semibold">
              <Clock className="w-4 h-4 mr-1" /> 
              <span>Limited offer ends in {offerDays} days</span>
            </div>
          )}
          
          <div className="flex items-center text-green-700 text-xs font-semibold">
            <Truck className="w-4 h-4 mr-1" /> 
            <span>Free Delivery Countrywide</span>
          </div>
          
          <div className="flex items-center text-green-600 text-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> 
            <span>In Stock</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gradient-to-r from-green-700 to-green-500 text-white py-2 px-4 rounded-xl font-bold shadow-lg hover:from-green-900 hover:to-green-600 hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <ShoppingCart className="w-5 h-5" /> Buy Now
          </button>
          <a
            href="https://wa.me/+254750095397"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white border border-green-200 text-green-700 py-2 px-4 rounded-xl font-bold shadow hover:bg-green-50 hover:border-green-400 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <MessageCircle className="w-5 h-5" /> Enquire
          </a>
        </div>
      </div>
    </div>
  );
}