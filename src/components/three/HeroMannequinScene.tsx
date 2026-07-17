"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { MannequinLoader } from "@/components/shared/MannequinLoader";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

type Concept = {
  id: string;
  name: string;
  name_ar: string;
  summary: string;
  summary_ar: string;
  material: string;
  material_ar: string;
  tone: string;
  style: "platinum" | "steel" | "graphite";
};

const concepts: Concept[] = [
  {
    id: "atelier-torso",
    name: "Atelier Tailor Torso",
    name_ar: "جذع مانيكان بلاتيني",
    summary: "Seamless sculpted form with balanced curves for luxury presentation.",
    summary_ar: "شكل منحوت بخصر نحيف وانسيابية كلاسيكية تناسب أرقى المحلات.",
    material: "platinum fiberglass (Clearcoat)",
    material_ar: "فايبر جلاس بلاتيني (لامع)",
    tone: "#f8fafc",
    style: "platinum",
  },
  {
    id: "editorial-torso",
    name: "Editorial Power Dummy",
    name_ar: "مانيكان عرض ستيل",
    summary: "Sharp industrial silhouette with extreme shoulders and a tapered waist.",
    summary_ar: "بروفايل رياضي حاد وأكتاف عريضة جداً لإبراز هيبة القطع الفاخرة.",
    material: "polished chrome finish",
    material_ar: "تشطيب ستيل مصقول",
    tone: "#cbd5e1",
    style: "steel",
  },
  {
    id: "modular-torso",
    name: "Modular Retail Form",
    name_ar: "فورمة عرض جرافيت",
    summary: "A robust, straight-cut graphite concept for dynamic shop floors.",
    summary_ar: "شكل عملي ومستقيم يشبه الأسطوانة، يوحي بالمتانة والقوة.",
    material: "matte graphite shell",
    material_ar: "قشرة جرافيت مطفية",
    tone: "#334155",
    style: "graphite",
  },
];

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

// OMEGA UPGRADE: 3 Distinct Procedural Silhouettes
function SculptedTorso({ style, tone }: { style: Concept["style"]; tone: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // 1. OMEGA MASTERPIECE: Defining unique mathematical profiles for each style
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    let profile: number[][] = [];

    if (style === "platinum") {
      // THE HOURGLASS: Classic, elegant, narrow waist
      profile = [
        [0, 2.6], [0.08, 2.6], [0.06, 2.3], // Elegant Neck
        [0.18, 2.1], [0.38, 1.9],           // Soft sloping shoulders
        [0.35, 1.5],                        // Bust/Chest
        [0.20, 1.0],                        // Pinched waist
        [0.40, 0.4],                        // Flared Hips
        [0.35, 0], [0, 0]                   // Base
      ];
    } else if (style === "steel") {
      // THE V-TAPER: Power, masculine, extreme broad shoulders
      profile = [
        [0, 2.5], [0.12, 2.5], [0.10, 2.3], // Thicker Neck
        [0.30, 2.15], [0.60, 2.0],          // EXTREMELY broad shoulders
        [0.55, 1.6],                        // Upper chest
        [0.35, 1.0],                        // Sharp taper inward
        [0.32, 0.4],                        // Narrow hips
        [0.30, 0], [0, 0]                   // Base
      ];
    } else if (style === "graphite") {
      // THE INDUSTRIAL BLOCK: Straight, robust, technical
      profile = [
        [0, 2.4], [0.15, 2.4], [0.15, 2.1], // Blocky Neck
        [0.45, 2.0], [0.45, 1.8],           // Squared off shoulders
        [0.45, 1.2],                        // Straight sides
        [0.45, 0.6],                        // Straight sides
        [0.45, 0], [0, 0]                   // Flat wide base
      ];
    }

    profile.forEach(([x, y]) => points.push(new THREE.Vector2(x, y)));
    return new THREE.LatheGeometry(points, 96, 0, Math.PI * 2);
  }, [style]);

  // 2. OMEGA MASTERPIECE: The Physical Materials Engine
  const material = useMemo(() => {
    const isPlatinum = style === "platinum";
    const isSteel = style === "steel";

    return new THREE.MeshPhysicalMaterial({
      color: tone,
      metalness: isSteel ? 0.95 : isPlatinum ? 0.4 : 0.2,
      roughness: isSteel ? 0.15 : isPlatinum ? 0.1 : 0.7,
      clearcoat: isPlatinum || isSteel ? 1.0 : 0.0,
      clearcoatRoughness: isPlatinum ? 0.05 : 0.3,
      envMapIntensity: isSteel ? 2.0 : 1.2,
      reflectivity: 1.0,
      flatShading: false,
    });
  }, [style, tone]);

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0b0c13",
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // OMEGA INTERACTIVE: Subtle Parallax Tracking
    const targetRotationY = Math.sin(state.clock.elapsedTime * 0.25) * 0.12 + (state.pointer.x * 0.15);
    const targetRotationX = (state.pointer.y * -0.1);
    const targetPositionY = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY, 0.04);
  });

  return (
    <Float speed={1} rotationIntensity={0.04} floatIntensity={0.15}>
      <group ref={groupRef} position={[0, -1.0, 0]} rotation={[0, -0.1, 0]}>
        {/* CRITICAL FIX: key={style} forces React to rebuild the mesh geometry */}
        <mesh key={style} geometry={geometry} material={material} castShadow receiveShadow />

        {/* OMEGA DETAIL: Premium Neck Cap */}
        <mesh position={[0, style === "platinum" ? 2.6 : style === "steel" ? 2.5 : 2.4, 0]}>
          <cylinderGeometry args={[style === "steel" ? 0.14 : 0.12, style === "steel" ? 0.14 : 0.12, 0.04, 32]} />
          <meshPhysicalMaterial color={tone} metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>

        <mesh material={darkMaterial} position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
        </mesh>

        <mesh material={darkMaterial} position={[0, -0.82, 0]} scale={[1.46, 0.06, 0.82]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={darkMaterial} position={[0, -0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.92, 0.015, 32, 128]} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneStage({ concept }: { concept: Concept }) {
  return (
    <Canvas
      className="hero-3d-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 6.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0f111a"]} />
      <Environment preset="studio" environmentIntensity={0.9} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.6} color="#e2e8f0" />
      <spotLight position={[0, 8, 2]} angle={0.35} intensity={2.5} penumbra={1} color="#ffffff" />

      <Suspense fallback={null}>
        <SculptedTorso style={concept.style} tone={concept.tone} />
      </Suspense>

      <mesh position={[0, -2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 128]} />
        <meshPhysicalMaterial color="#0b0c13" roughness={0.05} metalness={0.9} clearcoat={1} />
      </mesh>

      <ContactShadows position={[0, -2.44, 0]} opacity={0.75} scale={12} blur={2.8} far={4} color="#000000" />

      {/* OMEGA UPGRADE: 360 Freedom Enabled */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.1}
        makeDefault
      />
    </Canvas>
  );
}

export function HeroMannequinScene() {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [webglReady, setWebglReady] = useState<boolean | null>(null);
  const concept = concepts[activeIndex];

  useEffect(() => {
    setWebglReady(canUseWebGL());
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % concepts.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[580px] w-full overflow-hidden">
      <div className="absolute inset-x-8 top-14 bottom-24 border border-white/10 bg-black/20" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-white/10 pb-4 text-xs uppercase tracking-[0.25em] text-[#94a3b8]">
        <span>{pickLocalized(locale, { en: "Procedural Torso Sculpting", ar: "عرض نحت جذع المانيكان" })}</span>
        <span>{pickLocalized(locale, { en: "Interactive 360° Space", ar: "مساحة 360° تفاعلية" })}</span>
      </div>

      {/* Cursor UX hints for the 360 rotation */}
      <div className="absolute inset-x-0 top-10 h-[480px] cursor-grab active:cursor-grabbing">
        {webglReady === false ? (
          <MannequinLoader className="h-full" label="3D preview fallback" labelAr="بديل عرض 3D" />
        ) : (
          <SceneStage concept={concept} />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mb-4 grid grid-cols-3 gap-2 px-8">
          {concepts.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all duration-700 ${index === activeIndex ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "bg-white/10 hover:bg-white/30"}`}
              aria-label={pickLocalized(locale, { en: `Show ${item.name}`, ar: `اعرض ${item.name_ar}` })}
            />
          ))}
        </div>

        <div className="glass-panel rounded-none border-x-0 border-b-0 p-6 backdrop-blur-[60px] shadow-2xl pointer-events-none">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e2e8f0]">
            {pickLocalized(locale, { en: concept.material, ar: concept.material_ar })}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-wide text-white">
            {pickLocalized(locale, { en: concept.name, ar: concept.name_ar })}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#94a3b8] max-w-3xl">
            {pickLocalized(locale, { en: concept.summary, ar: concept.summary_ar })}
          </p>
        </div>
      </div>
    </div>
  );
}