import React from 'react';

const Dashboard = ({ reports, onDelete, onUpdate }) => {
  return (
    <main className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">Aktif Analiz Kayıtları</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
              <th className="p-6">Envanter Bilgisi</th>
              <th className="p-6">Teşhis Detayı</th>
              <th className="p-6 text-center">Yönetim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-6">
                  <span className="font-bold text-slate-900 block">{report.plantName}</span>
                  <span className="text-[10px] text-slate-400">REF-ID: {report.id}</span>
                </td>
                <td className="p-6">
                  <span className="text-rose-600 font-bold block mb-2">{report.disease}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-md font-black tracking-tighter ${
                    report.status === 'Kapatıldı' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => onUpdate(report.id)} className="text-[11px] font-bold text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition">Onayla</button>
                    <button onClick={() => onDelete(report.id)} className="text-[11px] font-bold text-rose-600 border border-rose-200 px-4 py-2 rounded-lg hover:bg-rose-50 transition">Kaydı Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Dashboard;