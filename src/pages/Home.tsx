import React, { useState } from 'react';
import { Search, Filter, Package, ArrowRightLeft } from 'lucide-react';
import { ItemCard } from '../components/ItemCard';
import { CATEGORIES, Item } from '../types';
import { motion } from 'motion/react';

interface HomeProps {
  items: Item[];
}

export function Home({ items }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 pt-8 md:pt-24 px-6 max-w-5xl mx-auto">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4"
        >
          Tukar Barang,<br />
          <span className="italic text-brand-terracotta">Temukan Cerita.</span>
        </motion.h1>
        <p className="text-brand-ink/60 max-w-md text-lg">
          Platform barter lokal untuk menukar barang yang tidak kamu gunakan dengan sesuatu yang lebih bermakna.
        </p>
      </header>

      <div className="mb-12">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={20} />
          <input
            type="text"
            placeholder="Cari barang..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-serif font-bold mb-8">Cara Kerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Daftarkan Barang', desc: 'Unggah foto dan deskripsi barang yang ingin kamu tukarkan.', icon: Package },
            { title: 'Cari Kecocokan', desc: 'Jelajahi barang unik dari tetangga dan temukan yang kamu butuhkan.', icon: Search },
            { title: 'Ajukan Tukar', desc: 'Kirim permintaan tukar dan mulai percakapan untuk kesepakatan.', icon: ArrowRightLeft },
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] card-shadow">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-2xl flex items-center justify-center text-brand-olive mb-6">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-brand-ink/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">Jelajahi Barang</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar max-w-[60%]">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-4 rounded-2xl font-medium transition-all whitespace-nowrap ${
                selectedCategory === null ? 'bg-brand-olive text-white' : 'bg-white text-brand-ink/60 hover:bg-brand-olive/10'
              }`}
            >
              Semua
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-4 rounded-2xl font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat ? 'bg-brand-olive text-white' : 'bg-white text-brand-ink/60 hover:bg-brand-olive/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-ink/40 italic font-serif text-xl">Tidak ada barang yang ditemukan...</p>
          </div>
        )}
      </section>
    </div>
  );
}
