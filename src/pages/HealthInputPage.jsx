import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const HealthInputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bloodPressure: ""
  });

  const calculateStatus = (weight) => {
    const w = Number(weight);
    if (!w) return "Belum diisi";
    if (w < 50) return "Di bawah ideal";
    if (w > 70) return "Di atas ideal";
    return "Ideal";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Save current data
      const healthData = {
        ...newData,
        weightStatus: calculateStatus(newData.weight),
        heightStatus: newData.height ? "Normal" : "Belum diisi",
        bloodPressureStatus: newData.bloodPressure ? "Normal" : "Belum diisi",
        date: new Date().toISOString()
      };
      localStorage.setItem('healthData', JSON.stringify(healthData));

      // Update historical data
      const historicalData = JSON.parse(localStorage.getItem('healthHistory') || '[]');
      const today = new Date().toLocaleDateString('id-ID', { weekday: 'short' });
      
      // Update or add today's entry
      const existingIndex = historicalData.findIndex(item => 
        new Date(item.date).toLocaleDateString('id-ID', { weekday: 'short' }) === today
      );
      
      if (existingIndex >= 0) {
        historicalData[existingIndex] = { ...healthData, day: today };
      } else {
        historicalData.push({ ...healthData, day: today });
      }
      
      // Keep only the last 7 days
      const lastSevenDays = historicalData.slice(-7);
      localStorage.setItem('healthHistory', JSON.stringify(lastSevenDays));
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Data kesehatan berhasil disimpan!");
    navigate("/health-monitor");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Kembali</span>
        </button>

        <h1 className="text-3xl font-bold text-[#0E6245] mb-8">Input Data</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium mb-2">
                Tinggi badan
              </label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="Masukkan tinggi badan (cm)"
                value={formData.height}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-2">
                Berat badan
              </label>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="Masukkan berat badan (kg)"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="bloodPressure" className="block text-sm font-medium mb-2">
                Tekanan darah
              </label>
              <Input
                id="bloodPressure"
                name="bloodPressure"
                type="text"
                placeholder="Masukkan tekanan darah (contoh: 120-80)"
                value={formData.bloodPressure}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button type="submit" className="w-full bg-[#0E6245] hover:bg-[#0E6245]/90">
              Simpan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthInputPage;