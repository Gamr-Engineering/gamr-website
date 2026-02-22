import { Trophy, DollarSign, Users, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const StatisticsInfographic = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Trophy,
      value: 4500,
      suffix: "+",
      label: "Tournaments",
      sublabel: "Organized",
      progress: 90,
    },
    {
      icon: DollarSign,
      value: 550,
      prefix: "$",
      suffix: "K",
      label: "Prize Money",
      sublabel: "Payout",
      progress: 75,
    },
    {
      icon: Users,
      value: 480,
      suffix: "K+",
      label: "Gamers",
      sublabel: "Connected",
      progress: 95,
    },
    {
      icon: Globe,
      value: 27,
      suffix: "+",
      label: "Countries",
      sublabel: "Across Africa",
      progress: 80,
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12">
        {stats.map((stat, index) => {
          const CounterComponent = () => {
            const [count, setCount] = useState(0);

            useEffect(() => {
              if (!isVisible) return;

              const duration = 2000;
              const steps = 60;
              const increment = stat.value / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                  setCount(stat.value);
                  clearInterval(timer);
                } else {
                  setCount(Math.floor(current));
                }
              }, duration / steps);

              return () => clearInterval(timer);
            }, [isVisible]);

            return (
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter block mb-1">
                {stat.prefix}{formatNumber(count)}{stat.suffix}
              </span>
            );
          };

          return (
            <div
              key={index}
              className="relative group flex flex-col justify-between"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              {/* Card Content */}
              <div className="space-y-4">
                {/* Value with animated counter */}
                <div>
                  <CounterComponent />

                  {/* Label */}
                  <div className="space-y-1 mt-2">
                    <div className="text-lg font-bold text-blue-500 uppercase tracking-widest">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {stat.sublabel}
                    </div>
                  </div>
                </div>

                {/* Progress bar (Minimal) */}
                <div className="pt-2">
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-1000 ease-out"
                      style={{ width: isVisible ? `${stat.progress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsInfographic;
