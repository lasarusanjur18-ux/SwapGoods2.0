import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Package, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { CATEGORIES, Category, Item } from '../types';
import { motion } from 'motion/react';
import { generateItemDescription } from '../services/geminiService';

interface AddItemProps {
  onAddItem: (item: Omit<Item, 'id' | 'createdAt' | 'ownerId' | 'ownerName'>) => void;
}

export function AddItem({ onAddItem }: AddItemProps) {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Lainnya' as Category,
    condition: 'Bekas Bagus' as Item['condition'],
    location: '',
    desiredExchange: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(formData);
    navigate('/');
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) return;
    setIsGenerating(true);
    const desc = await generateItemDescription(formData.title, formData.category);
    setFormData({ ...formData, description: desc || '' });
    setIsGenerating(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pb-24 pt-8 md:pt-24 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-serif font-bold mb-8">Tambah Barang Baru</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Foto Barang</span>
              <div className="relative aspect-video bg-white rounded-3xl border-2 border-dashed border-brand-olive/20 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-olive/5 transition-colors overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera size={40} className="text-brand-olive/40 mb-2" />
                    <span className="text-sm text-brand-ink/40">Klik untuk upload foto</span>
                  </>
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" required />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Nama Barang</span>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none"
                placeholder="Contoh: Kamera Analog Canon AE-1"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Kategori</span>
                <select
                  className="w-full px-6 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Kondisi</span>
                <select
                  className="w-full px-6 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none appearance-none"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as Item['condition'] })}
                >
                  <option value="Baru">Baru</option>
                  <option value="Seperti Baru">Seperti Baru</option>
                  <option value="Bekas Bagus">Bekas Bagus</option>
                  <option value="Bekas">Bekas</option>
                </select>
              </label>
            </div>

            <label className="block">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 block">Deskripsi</span>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={!formData.title || isGenerating}
                  className="flex items-center gap-1 text-[10px] font-bold text-brand-olive uppercase tracking-wider hover:text-brand-terracotta transition-colors disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  Buat dengan AI
                </button>
              </div>
              <textarea
                required
                rows={4}
                className="w-full px-6 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none resize-none"
                placeholder="Ceritakan tentang barang ini..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Lokasi</span>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={20} />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none"
                  placeholder="Contoh: Jakarta Selatan"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2 block">Ingin Ditukar Dengan</span>
              <div className="relative">
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={20} />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none"
                  placeholder="Contoh: Tanaman Hias atau Buku Seni"
                  value={formData.desiredExchange}
                  onChange={(e) => setFormData({ ...formData, desiredExchange: e.target.value })}
                />
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-brand-olive text-white rounded-2xl font-bold text-lg hover:bg-brand-olive/90 transition-all card-shadow"
          >
            Daftarkan Barang
          </button>
        </form>
      </motion.div>
    </div>
  );
}
