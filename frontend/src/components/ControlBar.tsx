import { Play, Pause, RotateCcw, FastForward } from "lucide-react";
import { useState } from "react";

export default function ControlBar({ wsRef }: { wsRef: any }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState("2x");

  const handlePlayPause = () => {
    if (isPlaying) {
      wsRef.current?.send("pause");
      setIsPlaying(false);
    } else {
      wsRef.current?.send("play");
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    wsRef.current?.send("reset");
    wsRef.current?.send("start");
    setIsPlaying(true);
  };

  const handleSpeed = (s: string) => {
    setSpeed(s);
    wsRef.current?.send(`speed_${s}`);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700 font-mono text-xs">
      <button 
        onClick={handleRestart}
        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
        title="Restart Simulation"
      >
        <RotateCcw size={16} />
      </button>
      
      <div className="w-px h-4 bg-slate-700 mx-1"></div>
      
      <button 
        onClick={handlePlayPause}
        className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950 rounded transition-colors"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <div className="w-px h-4 bg-slate-700 mx-1"></div>
      
      <div className="flex items-center gap-1">
        <FastForward size={14} className="text-slate-500 mr-1" />
        {["1x", "2x", "4x"].map((s) => (
          <button
            key={s}
            onClick={() => handleSpeed(s)}
            className={`px-2 py-1 rounded transition-colors ${
              speed === s 
                ? "bg-slate-700 text-white font-bold" 
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
