
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const HistoricalData = () => {
  const accuracyData = [
    { time: '00:00', accuracy: 92 },
    { time: '04:00', accuracy: 93 },
    { time: '08:00', accuracy: 94 },
    { time: '12:00', accuracy: 93 },
    { time: '16:00', accuracy: 95 },
    { time: '20:00', accuracy: 94 },
    { time: '24:00', accuracy: 94 },
  ];

  const additionData = [
    { alloy: 'FeSi 75%', count: 12, success: 11 },
    { alloy: 'Mn Metal', count: 8, success: 8 },
    { alloy: 'FeCr LC', count: 3, success: 3 },
    { alloy: 'SiC', count: 2, success: 1 },
  ];

  return (
    <Card className="bg-white border-slate-200 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center">
          <Database className="h-5 w-5 mr-2 text-slate-600" />
          Historical Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-4">Model Accuracy (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[90, 96]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    color: '#1e293b'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#475569" 
                  strokeWidth={2}
                  dot={{ fill: '#475569', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-4">Alloy Addition Success Rate</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={additionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="alloy" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    color: '#1e293b'
                  }}
                />
                <Bar dataKey="success" fill="#475569" />
                <Bar dataKey="count" fill="#94a3af" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
