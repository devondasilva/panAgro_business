"use client";

import { AdminInvestor } from "./types";

export default function InvestorsTab({ investors }: { investors: AdminInvestor[] }) {
  if (investors.length === 0) {
    return <p className="text-sm text-[#1A2F15]/60">Aucun investisseur enregistré pour le moment.</p>;
  }

  return (
    <div className="rounded-2xl border border-[#1A2F15]/15 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#1A2F15] text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Nom</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Téléphone</th>
            <th className="px-4 py-3 font-semibold">Inscrit le</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((inv, i) => (
            <tr key={inv.id} className={i % 2 === 0 ? "bg-[#F8FAF5]" : "bg-white"}>
              <td className="px-4 py-3 font-semibold">{inv.name}</td>
              <td className="px-4 py-3 text-gray-600">{inv.email}</td>
              <td className="px-4 py-3 text-gray-600">{inv.phone}</td>
              <td className="px-4 py-3 text-xs text-gray-400">
                {new Date(inv.createdAt).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
