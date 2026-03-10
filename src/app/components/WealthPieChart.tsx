import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router';
import { Card } from './ui/card';
import { ChevronRight } from 'lucide-react';

interface WealthData {
  name: string;
  value: number;
  color: string;
}

interface WealthPieChartProps {
  data: WealthData[];
  enableNavigation?: boolean;
}

export function WealthPieChart({ data, enableNavigation = true }: WealthPieChartProps) {
  const navigate = useNavigate();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const getSectorRoute = (sectorName: string): string => {
    const routes: Record<string, string> = {
      'Savings': '/sector/savings',
      'Bonds': '/sector/bonds',
      'Stocks': '/sector/stocks',
      'Cryptocurrency': '/sector/cryptocurrency',
      'Investment Property': '/sector/investment-property',
      'Joint Assets': '/sector/joint-assets',
    };
    return routes[sectorName] || '/';
  };

  const handleSectorClick = (sectorName: string) => {
    if (enableNavigation) {
      navigate(getSectorRoute(sectorName));
    }
  };

  const renderCustomLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(1);
    return `${percent}%`;
  };

  // Custom tooltip that displays sector name in its respective color
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const sectorData = payload[0];
      const sectorColor = sectorData.payload.color;
      
      return (
        <div
          style={{
            backgroundColor: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <p style={{ color: sectorColor, fontWeight: '600', marginBottom: '4px' }}>
            {sectorData.name}
          </p>
          <p style={{ color: '#d4d4d8', fontSize: '14px' }}>
            ${sectorData.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      <h2 className="text-xl font-semibold text-white mb-6">Wealth Composition</h2>
      <div className="h-[400px] min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onClick={(entry) => enableNavigation && handleSectorClick(entry.name)}
              style={enableNavigation ? { cursor: 'pointer' } : undefined}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ color: '#d4d4d8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <button
            key={item.name}
            onClick={() => handleSectorClick(item.name)}
            disabled={!enableNavigation}
            className={`flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg ${
              enableNavigation ? 'hover:bg-zinc-800 transition-colors group cursor-pointer' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-zinc-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-white font-semibold">
                  ${item.value.toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </div>
              {enableNavigation && (
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              )}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}