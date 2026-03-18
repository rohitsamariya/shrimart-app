export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  emoji: string;
  image?: string;
  rating: number;
  desc: string;
}

export const products: Product[] = [
  { id: 1, name: "Fresh Red Tomatoes", price: 45, unit: "500g", category: "Vegetables", emoji: "🍅", image: "/src/assets/products/tomatoes.png", rating: 4.8, desc: "Premium vine-ripened red tomatoes. Perfect for salads and cooking." },
  { id: 8, name: "Farm Fresh Milk", price: 62, unit: "1 Litre", category: "Dairy", emoji: "🥛", image: "/src/assets/products/milk.png", rating: 5.0, desc: "Pure and farm-fresh whole milk in a glass bottle." },
  { id: 5, name: "Sweet Oranges", price: 120, unit: "1 kg", category: "Fruits", emoji: "🍊", image: "/src/assets/products/oranges.png", rating: 4.9, desc: "Vibrant and juicy sweet oranges, packed with vitamin C." },
  { id: 3, name: "Premium Carrots", price: 38, unit: "500g", category: "Vegetables", emoji: "🥕", image: "/src/assets/products/carrots.png", rating: 4.7, desc: "Sweet and crunchy premium carrots. Ideal for healthy snacking and cooking." },
  { id: 2, name: "Green Spinach", price: 15, unit: "250g", category: "Vegetables", emoji: "🥬", rating: 4.6, desc: "Tender, crisp spinach leaves picked fresh daily. Great for palak paneer or salads." },
  { id: 4, name: "Onions", price: 20, unit: "1 kg", category: "Vegetables", emoji: "🧅", rating: 4.5, desc: "Fresh onions, essential for every Indian kitchen. Crisp and pungent." },
  { id: 6, name: "Fresh Apples", price: 80, unit: "1 kg", category: "Fruits", emoji: "🍎", rating: 4.7, desc: "Crisp Shimla apples with a perfect sweet-tart balance." },
  { id: 7, name: "Bananas", price: 35, unit: "Dozen", category: "Fruits", emoji: "🍌", rating: 4.6, desc: "Ripe and sweet bananas, great for snacking or making smoothies." },
  { id: 9, name: "Curd (Dahi)", price: 40, unit: "500g", category: "Dairy", emoji: "🍶", rating: 4.8, desc: "Thick and creamy homestyle curd, freshly set every day." },
  { id: 10, name: "Paneer", price: 90, unit: "200g", category: "Dairy", emoji: "🧀", rating: 4.9, desc: "Soft, fresh cottage cheese made from pure cow's milk." },
  { id: 11, "name": "Lay's Chips", price: 20, unit: "Pack", category: "Snacks", emoji: "🍟", rating: 4.5, desc: "Classic crispy potato chips in original salted flavor." },
  { id: 12, name: "Biscuits", price: 15, unit: "Pack", category: "Snacks", emoji: "🍪", rating: 4.4, desc: "Crispy wheat biscuits, perfect for chai time." },
  { id: 13, name: "Bread", price: 35, unit: "Loaf", category: "Essentials", emoji: "🍞", rating: 4.5, desc: "Soft sandwich bread, freshly baked. Great for morning breakfast." },
  { id: 14, name: "Rice", price: 65, unit: "1 kg", category: "Essentials", emoji: "🍚", rating: 4.7, desc: "Premium Basmati rice, long-grain and aromatic." },
  { id: 15, name: "Cooking Oil", price: 130, unit: "1 Litre", category: "Essentials", emoji: "🫙", rating: 4.6, desc: "Pure refined sunflower cooking oil, light and healthy." },
];

export const categories = ["All", "Vegetables", "Fruits", "Dairy", "Snacks", "Essentials"];
