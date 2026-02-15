import React, { useState } from 'react';

const ReportForm = ({ onAdd }) => {
  const [data, setData] = useState({ plantName: '', disease: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(data);
    setData({ plantName: '', disease: '' });
  };

  return (
    <section className="max-w-6xl mx-auto mb-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold mb-6 text-slate-800 border-l-4 border-green-600 pl-3">Yeni Analiz Girişi</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600">Bitki Varyetesi</label>
            <input 
              className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-green-600 outline-none bg-slate-50"
              placeholder="Örn: Anadolu Kırmızısı Buğday"
              value={data.plantName}
              onChange={(e) => setData({...data, plantName: e.target.value})}
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600">Patolojik Bulgular</label>
            <input 
              className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-green-600 outline-none bg-slate-50"
              placeholder="Örn: Septoria Yaprak Lekesi"
              value={data.disease}
              onChange={(e) => setData({...data, disease: e.target.value})}
              required 
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-green-700 text-white p-3.5 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg shadow-green-100 active:scale-[0.98]">
              Sisteme Kaydet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReportForm;