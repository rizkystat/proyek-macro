import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

const HealthProgressChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const historicalData = JSON.parse(localStorage.getItem('healthHistory') || '[]');
    setData(historicalData.map(item => ({
      day: item.day,
      weight: Number(item.weight) || 0
    })));
  }, []);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0E6245]">Grafik perkembangan</h2>
        <Button variant="outline" className="text-[#0E6245] border-[#0E6245]">
          Lihat Grafik
        </Button>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#0E6245" 
              strokeWidth={2}
              dot={{ fill: '#0E6245', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthProgressChart;