import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Environment } from "@react-three/drei";
import { BrainCircuit, Cpu, Sparkles, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { Link } from "wouter";
import * as THREE from "three";

// A simple procedural "neural network" 3D visualization
function NeuralNetwork() {
  const group = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotation.get();
      group.current.rotation.x += 0.002;
    }
  });

  const nodes = Array.from({ length: 40 }).map(() => [
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5,
  ] as [number, number, number]);

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Draw lines between some nodes to simulate connections */}
      {nodes.map((start, i) => {
        if (i > nodes.length - 3) return null;
        return (
          <Line
            key={`line-${i}`}
            points={[start, nodes[i + 1], nodes[i + 2]]}
            color="#2563EB"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
    </group>
  );
}

export default function AISolutions() {
  const solutions = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: "Predictive Analytics",
      desc: "Leverage historical data to forecast trends, customer behavior, and operational needs with incredible accuracy."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "Generative AI",
      desc: "Automate content creation, generate code, and produce unique designs tailored to your brand identity."
    },
    {
      icon: <Workflow className="w-8 h-8 text-primary" />,
      title: "Intelligent Automation",
      desc: "Streamline workflows by replacing manual tasks with smart, learning algorithms that improve over time."
    },
    {
      icon: <Cpu className="w-8 h-8 text-accent" />,
      title: "Machine Learning Models",
      desc: "Custom-trained ML models built to solve your unique, complex business challenges at scale."
    }
  ];

  return (
    <div className="min-h-screen pb-20 bg-black text-white selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden border-b border-white/10">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={2} color="#8B5CF6" />
            <Environment preset="city" />
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
              <NeuralNetwork />
            </Float>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/40 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 rounded-full backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Next-Gen Technology
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
              Artificial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                Intelligence.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              We build custom AI ecosystems that turn complex data into decisive action, driving unprecedented growth and efficiency.
            </p>
            
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-bold">
              <Link href="/contact">Consult an AI Expert <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 max-w-7xl py-24">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Enterprise AI Solutions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Harness the power of neural networks and deep learning to revolutionize your industry.</p>
        </ScrollReveal>

        <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, i) => (
            <StaggerChild key={i}>
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors duration-500">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors duration-500 pointer-events-none" />
                
                <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{solution.desc}</p>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>
      </section>
      
      {/* CTA */}
      <section className="container mx-auto px-4 max-w-4xl py-24 text-center">
        <ScrollReveal>
          <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/10 to-black border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Ready to integrate AI?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto relative z-10">Our engineers are ready to assess your infrastructure and build a tailored AI roadmap.</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 relative z-10">
              <Link href="/contact">Start the Conversation</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
