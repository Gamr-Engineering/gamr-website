import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import { Network, Zap, Cpu, Globe, Trophy, User, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: "article" | "player" | "team" | "game" | "city" | "tournament";
  label: string;
  slug?: string;
}

interface LinkData extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

const data: { nodes: Node[]; links: LinkData[] } = {
  nodes: [
    { id: "art1", group: "article", label: "The Rise of Lagos Esports", slug: "the-rise-of-african-esports" },
    { id: "city1", group: "city", label: "Lagos" },
    { id: "game1", group: "game", label: "EA Sports FC" },
    { id: "hub1", group: "tournament", label: "Carven Gaming Hub" },
    { id: "p1", group: "player", label: "King_J" },
    { id: "t1", group: "team", label: "Gamr Squad" },
    { id: "art2", group: "article", label: "Mobile Boom in Nairobi", slug: "mobile-esports-boom-in-africa" },
    { id: "city2", group: "city", label: "Nairobi" },
    { id: "game2", group: "game", label: "PUBG Mobile" },
    { id: "game3", group: "game", label: "CODM" },
  ],
  links: [
    { source: "art1", target: "city1", value: 2 },
    { source: "art1", target: "game1", value: 2 },
    { source: "art1", target: "hub1", value: 1 },
    { source: "hub1", target: "city1", value: 1 },
    { source: "p1", target: "art1", value: 1 },
    { source: "p1", target: "t1", value: 3 },
    { source: "t1", target: "city1", value: 1 },
    { source: "art2", target: "city2", value: 2 },
    { source: "art2", target: "game2", value: 2 },
    { source: "art2", target: "game3", value: 2 },
    { source: "city1", target: "city2", value: 1 },
  ],
};

const groupColors = {
  article: "#3b82f6", // Blue
  player: "#22c55e",  // Green
  team: "#a855f7",    // Purple
  game: "#f59e0b",    // Amber
  city: "#ef4444",    // Red
  tournament: "#06b6d4" // Cyan
};

const KnowledgeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, LinkData>(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    const link = svg.append("g")
      .attr("stroke", "#27272a")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation) as any)
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    node.append("circle")
      .attr("r", 12)
      .attr("fill", d => groupColors[d.group])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("class", "cursor-pointer hover:scale-125 transition-transform");

    node.append("text")
      .attr("x", 18)
      .attr("y", 5)
      .text(d => d.label)
      .attr("fill", "#a1a1aa")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")
      .attr("class", "select-none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-zinc-950 rounded-[3rem] border border-zinc-800 overflow-hidden group">
      <svg ref={svgRef} className="w-full h-full" />

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-8 left-8 right-8 md:right-auto md:w-80 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl z-20"
          >
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: groupColors[selectedNode.group] }} 
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {selectedNode.group} Entity
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{selectedNode.label}</h3>
            
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Exploring the multidimensional impact of <strong>{selectedNode.label}</strong> within the Pan-African esports ecosystem intelligence layer.
            </p>

            {selectedNode.group === "article" && selectedNode.slug && (
              <Link 
                to={`/insights/${selectedNode.slug}`}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
              >
                READ INTEL REPORT <Zap className="w-4 h-4" />
              </Link>
            )}
            
            {selectedNode.group !== "article" && (
               <div className="flex gap-2">
                  <button className="flex-grow py-3 bg-zinc-800 text-white rounded-xl font-bold text-xs uppercase hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-3 h-3" /> GRAPH ORIGIN
                  </button>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 left-10 pointer-events-none">
         <h4 className="text-xl font-black text-white flex items-center gap-3">
            <Network className="w-6 h-6 text-blue-500" />
            Knowledge Graph OS
         </h4>
         <p className="text-xs text-zinc-500 font-medium">Relationship Engine & Entity Mapping</p>
      </div>

      <div className="absolute top-10 right-10 flex flex-col gap-2 bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
         {Object.entries(groupColors).map(([group, color]) => (
           <div key={group} className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
             <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{group}</span>
           </div>
         ))}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
