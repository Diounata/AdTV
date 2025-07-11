"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function TimeDisplay() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHour(now.getHours());
      setMinute(now.getMinutes());
      setSecond(now.getSeconds());
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="flex w-[360px] h-full items-center justify-between rounded-xl bg-white px-6 py-4 text-5xl font-bold text-green-700 shadow-md"
      aria-label="Horário atual"
    >
      <Clock size={42} />

      <span className="w-16 text-center">
        {hour.toString().padStart(2, "0")}
      </span>

      <span>:</span>

      <span className="w-16 text-center">
        {minute.toString().padStart(2, "0")}
      </span>

      <span>:</span>

      <span className="w-16 text-center">
        {second.toString().padStart(2, "0")}
      </span>
    </section>
  );
}
