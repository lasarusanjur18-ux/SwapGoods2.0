/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ItemDetail } from './pages/ItemDetail';
import { AddItem } from './pages/AddItem';
import { MySwaps } from './pages/MySwaps';
import { Profile } from './pages/Profile';
import { Item, SwapRequest } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const INITIAL_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Kamera Analog Olympus OM-1',
    description: 'Kamera analog klasik dengan lensa 50mm f1.8. Kondisi fisik 9/10, fungsi normal, lightmeter jalan. Bonus roll film Kodak Gold.',
    category: 'Hobi',
    condition: 'Bekas Bagus',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    ownerId: 'user1',
    ownerName: 'Budi Santoso',
    location: 'Bandung, Jawa Barat',
    desiredExchange: 'Lensa Sony E-Mount',
    rating: 4.8,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Tanaman Monstera Variegata',
    description: 'Tanaman hias koleksi, sudah ada 4 daun dengan corak variegata yang stabil. Akar sehat, media tanam premium.',
    category: 'Lainnya',
    condition: 'Seperti Baru',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop',
    ownerId: 'user2',
    ownerName: 'Siti Aminah',
    location: 'Jakarta Selatan',
    desiredExchange: 'Meja Kerja Kayu',
    rating: 4.9,
    createdAt: Date.now() - 86400000,
  },
  {
    id: '3',
    title: 'Buku Seni "The Art of Studio Ghibli"',
    description: 'Artbook original, hardcover, kondisi mulus tanpa lipatan. Berisi konsep art film-film Ghibli.',
    category: 'Buku',
    condition: 'Bekas Bagus',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
    ownerId: 'user3',
    ownerName: 'Andi Wijaya',
    location: 'Yogyakarta',
    desiredExchange: 'Vinyl Record Jazz',
    rating: 4.7,
    createdAt: Date.now() - 172800000,
  },
  {
    id: '4',
    title: 'Headphone Marshall Major IV',
    description: 'Wireless headphone dengan daya tahan baterai 80 jam. Suara jernih, bass mantap. Lengkap dengan box.',
    category: 'Elektronik',
    condition: 'Bekas Bagus',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    ownerId: 'user4',
    ownerName: 'Rina Kartika',
    location: 'Surabaya',
    desiredExchange: 'Smartwatch',
    rating: 4.5,
    createdAt: Date.now() - 259200000,
  }
];

export default function App() {
  const [items, setItems] = useLocalStorage<Item[]>('tukarbarang_items', INITIAL_ITEMS);
  const [requests, setRequests] = useLocalStorage<SwapRequest[]>('tukarbarang_requests', []);
  
  // Mock current user
  const currentUser = {
    id: 'me',
    name: 'Lasarus Anjur',
    location: 'Jakarta Pusat'
  };

  const myItems = items.filter(item => item.ownerId === currentUser.id);
  const otherItems = items.filter(item => item.ownerId !== currentUser.id);

  const handleAddItem = (newItemData: Omit<Item, 'id' | 'createdAt' | 'ownerId' | 'ownerName' | 'rating'>) => {
    const newItem: Item = {
      ...newItemData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      rating: 5.0, // Default rating for new items
    };
    setItems([newItem, ...items]);
  };

  const handleSendRequest = (newRequestData: Omit<SwapRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: SwapRequest = {
      ...newRequestData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: 'pending',
    };
    setRequests([newRequest, ...requests]);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home items={items} />} />
            <Route 
              path="/item/:id" 
              element={
                <ItemDetail 
                  items={items} 
                  myItems={myItems} 
                  onSendRequest={handleSendRequest} 
                />
              } 
            />
            <Route path="/add-item" element={<AddItem onAddItem={handleAddItem} />} />
            <Route path="/my-swaps" element={<MySwaps items={items} requests={requests} />} />
            <Route path="/profile" element={<Profile myItems={myItems} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
