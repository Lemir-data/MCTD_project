"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, TooltipProps,
} from "recharts";

/* Données réelles jan–juin 2026 ; juil–déc = 0 (mois futurs) */
const monthly = [
  { mois: "Janv", dons: 820000 },
  { mois: "Févr", dons: 940000 },
  { mois: "Mars", dons: 1100000 },
  { mois: "Avr",  dons: 760000 },
  { mois: "Mai",  dons: 1050000 },
  { mois: "Juin", dons: 1240000 },
  { mois: "Juil", dons: 0 },
  { mois: "Août", dons: 0 },
  { mois: "Sept", dons: 0 },
  { mois: "Oct",  dons: 0 },
  { mois: "Nov",  dons: 0 },
  { mois: "Déc",  dons: 0 },
];

const repartition = [
  { name: "Général", value: 32, color: "#1A3C6E" },
  { name: "Construction", value: 25, color: "#C8941A" },
  { name: "Missions", value: 18, color: "#7C3AED" },
  { name: "Éducation", value: 15, color: "#16a34a" },
  { name: "Social", value: 10, color: "#EF4444" },
];

function formatFCFA(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + " M";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + " K";
  return v.toString();
}

function BarTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p style={{ color: "#1A3C6E" }}>
        {payload[0].value?.toLocaleString("fr-FR")} FCFA
      </p>
    </div>
  );
}

function PieTooltip({ active, payload, total }: TooltipProps<number, string> & { total: number }) {
  if (!active || !payload?.length) return null;
  const pct    = payload[0].value ?? 0;
  const amount = Math.round((pct / 100) * total);
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1">{payload[0].name}</p>
      <p className="font-bold" style={{ color: payload[0].payload.color }}>
        {amount.toLocaleString("fr-FR")} FCFA
      </p>
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center mt-4">
      {repartition.map((r) => (
        <div key={r.name} className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
          {r.name} — {r.value}%
        </div>
      ))}
    </div>
  );
}

export function HistogrammeDons() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-gray-900">Dons par mois</h2>
          <p className="text-xs text-gray-400 mt-0.5">Montants collectés — janvier à juin 2026 (FCFA)</p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "#EFF6FF", color: "#1A3C6E" }}>
          2026
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="mois"
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatFCFA}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(26,60,110,0.05)", radius: 6 }} />
          <Bar dataKey="dons" radius={[6, 6, 0, 0]}>
            {monthly.map((entry, i) => {
              const maxVal = Math.max(...monthly.map(m => m.dons));
              const isBest = entry.dons > 0 && entry.dons === maxVal;
              const isFutur = entry.dons === 0;
              return (
                <Cell
                  key={i}
                  fill={isBest ? "#C8941A" : isFutur ? "#E2E8F0" : "#1A3C6E"}
                  opacity={isBest ? 1 : isFutur ? 0.5 : 0.72}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        Barre dorée = meilleur mois · Barres grises = mois à venir
      </p>
    </div>
  );
}

function AnonymatTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const count  = payload[0].value ?? 0;
  const amount = payload[0].payload.amount ?? 0;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1">{payload[0].name}</p>
      <p className="font-bold" style={{ color: payload[0].payload.color }}>
        {amount.toLocaleString("fr-FR")} FCFA
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{count} don{count > 1 ? "s" : ""}</p>
    </div>
  );
}

export function CamembertAnonymat({
  data,
  periodLabel,
}: {
  data: { name: string; value: number; amount: number; color: string }[];
  periodLabel: string;
}) {
  const total       = data.reduce((s, d) => s + d.value, 0);
  const totalAmount = data.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900">Dons anonymes / nominatifs</h2>
        <p className="text-xs text-gray-400 mt-0.5">Part des dons anonymes — {periodLabel}</p>
      </div>
      {total === 0 ? (
        <p className="text-sm text-gray-400 text-center py-16">Aucun don sur cette période</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<AnonymatTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center mt-4">
            {data.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                {d.name} — {Math.round((d.value / total) * 100)}%
              </div>
            ))}
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Montant total — {periodLabel}</p>
            <p className="text-lg font-bold" style={{ color: "#1A3C6E" }}>
              {totalAmount.toLocaleString("fr-FR")} FCFA
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export function CamembertAffectations({ total, periodLabel }: { total: number; periodLabel: string }) {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900">Répartition des affectations</h2>
        <p className="text-xs text-gray-400 mt-0.5">Part de chaque cause — {periodLabel}</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={repartition}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {repartition.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={(props: TooltipProps<number, string>) => <PieTooltip {...props} total={total} />} />
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend />
      {/* Total au centre — affiché via positionnement absolu */}
      <div className="text-center mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">Total collecté — {periodLabel}</p>
        <p className="text-lg font-bold" style={{ color: "#1A3C6E" }}>
          {total.toLocaleString("fr-FR")} FCFA
        </p>
      </div>
    </div>
  );
}
