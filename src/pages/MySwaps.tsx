import React from 'react';
import { Item, SwapRequest } from '../types';
import { motion } from 'motion/react';
import { ArrowRightLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface MySwapsProps {
  items: Item[];
  requests: SwapRequest[];
}

export function MySwaps({ items, requests }: MySwapsProps) {
  const getStatusIcon = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="text-amber-500" size={20} />;
      case 'accepted': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'rejected': return <XCircle className="text-rose-500" size={20} />;
    }
  };

  const getStatusText = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'accepted': return 'Diterima';
      case 'rejected': return 'Ditolak';
    }
  };

  return (
    <div className="pb-24 pt-8 md:pt-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif font-bold mb-8">Permintaan Tukar</h1>

      <div className="space-y-6">
        {requests.length > 0 ? (
          requests.map((req) => {
            const fromItem = items.find(i => i.id === req.fromItemId);
            const toItem = items.find(i => i.id === req.toItemId);

            if (!fromItem || !toItem) return null;

            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 card-shadow"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <img src={fromItem.image} className="w-20 h-20 rounded-2xl object-cover mb-2 mx-auto" />
                      <p className="text-[10px] font-bold uppercase truncate w-24">{fromItem.title}</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-brand-olive/40">
                      <ArrowRightLeft size={24} />
                    </div>

                    <div className="text-center">
                      <img src={toItem.image} className="w-20 h-20 rounded-2xl object-cover mb-2 mx-auto" />
                      <p className="text-[10px] font-bold uppercase truncate w-24">{toItem.title}</p>
                    </div>
                  </div>

                  <div className="flex-1 border-l border-black/5 pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(req.status)}
                      <span className="text-sm font-bold">{getStatusText(req.status)}</span>
                    </div>
                    <p className="text-sm text-brand-ink/60 italic mb-4">"{req.message || 'Tidak ada pesan.'}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-olive/10 flex items-center justify-center text-[10px] font-bold text-brand-olive">
                        {toItem.ownerName.charAt(0)}
                      </div>
                      <span className="text-xs font-medium">Pemilik: {toItem.ownerName}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-2 bg-brand-olive text-white rounded-xl text-xs font-bold hover:bg-brand-olive/90 transition-all">
                      Detail Chat
                    </button>
                    {req.status === 'pending' && (
                      <button className="px-6 py-2 bg-white text-rose-500 border border-rose-500/20 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all">
                        Batalkan
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] card-shadow">
            <p className="text-brand-ink/40 italic font-serif text-xl">Belum ada permintaan tukar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
