import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRightLeft, User, MessageSquare, ChevronLeft, Star } from 'lucide-react';
import { Item, SwapRequest } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ItemDetailProps {
  items: Item[];
  myItems: Item[];
  onSendRequest: (request: Omit<SwapRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export function ItemDetail({ items, myItems, onSendRequest }: ItemDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMyItem, setSelectedMyItem] = useState<string>('');
  const [message, setMessage] = useState('');

  const item = items.find(i => i.id === id);

  if (!item) return <div className="p-20 text-center">Barang tidak ditemukan.</div>;

  const handleRequest = () => {
    if (!selectedMyItem) return;
    onSendRequest({
      fromItemId: selectedMyItem,
      toItemId: item.id,
      message: message,
    });
    setIsModalOpen(false);
    navigate('/my-swaps');
  };

  return (
    <div className="pb-24 pt-8 md:pt-24 px-6 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-ink/60 mb-8 hover:text-brand-ink transition-colors">
        <ChevronLeft size={20} />
        <span>Kembali</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[40px] overflow-hidden card-shadow aspect-[4/5]"
        >
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="bg-brand-olive/10 text-brand-olive px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              {item.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 text-brand-ink/60">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1 text-brand-terracotta font-bold">
                <Star size={16} fill="currentColor" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
              <span className="mx-1">•</span>
              <span>Kondisi: {item.condition}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl card-shadow mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-3">Ingin Ditukar Dengan:</h3>
            <div className="flex items-center gap-3 text-brand-terracotta font-serif text-2xl italic">
              <ArrowRightLeft size={24} />
              <span>{item.desiredExchange}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-3">Deskripsi:</h3>
            <p className="text-brand-ink/80 leading-relaxed">{item.description}</p>
          </div>

          <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-olive/10 flex items-center justify-center text-xl font-bold text-brand-olive">
                {item.ownerName.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{item.ownerName}</p>
                <p className="text-xs text-brand-ink/40">Pemilik Barang</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-brand-olive text-white rounded-2xl font-bold hover:bg-brand-olive/90 transition-all card-shadow flex items-center gap-2"
            >
              <Repeat size={20} />
              Ajukan Tukar
            </button>
          </div>
        </motion.div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-brand-cream w-full max-w-lg rounded-[40px] p-8 card-shadow relative z-10"
            >
              <h2 className="text-3xl font-serif font-bold mb-6">Ajukan Penukaran</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2">Pilih Barangmu</label>
                  {myItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {myItems.map(myItem => (
                        <button
                          key={myItem.id}
                          onClick={() => setSelectedMyItem(myItem.id)}
                          className={`p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                            selectedMyItem === myItem.id ? 'border-brand-olive bg-brand-olive/5' : 'border-transparent bg-white'
                          }`}
                        >
                          <img src={myItem.image} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="text-xs font-bold truncate">{myItem.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-white rounded-2xl text-center">
                      <p className="text-sm text-brand-ink/60 mb-3">Kamu belum punya barang untuk ditukar.</p>
                      <button onClick={() => navigate('/add-item')} className="text-xs font-bold text-brand-olive underline">Tambah Barang Sekarang</button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-ink/60 mb-2">Pesan (Opsional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-6 py-4 bg-white rounded-2xl border-none card-shadow focus:ring-2 focus:ring-brand-olive outline-none resize-none"
                    placeholder="Halo, saya ingin menukar barang saya dengan barangmu..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-white text-brand-ink rounded-2xl font-bold hover:bg-white/80 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleRequest}
                    disabled={!selectedMyItem}
                    className="flex-1 py-4 bg-brand-olive text-white rounded-2xl font-bold hover:bg-brand-olive/90 transition-all disabled:opacity-50"
                  >
                    Kirim Ajuan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Repeat = ({ size }: { size: number }) => <ArrowRightLeft size={size} />;
