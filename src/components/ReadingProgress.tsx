import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const maxScroll = documentHeight - windowHeight;
      if (maxScroll > 0) {
        let percent = (scrollY / maxScroll) * 100;
        // Clamp between 0 and 100
        percent = Math.min(Math.max(percent, 0), 100);
        setProgress(percent);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-900 border-b border-white/5">
      <div
        className="h-full bg-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
