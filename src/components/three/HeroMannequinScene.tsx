"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
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
  pose: "standing" | "editorial" | "modular";
};

const concepts: Concept[] = [
  {
    id: "atelier-standing",
    name: "Atelier Standing Form",
    name_ar: "مانيكان عرض واقف",
    summary: "A clean retail silhouette for premium window displays.",
    summary_ar: "شكل عرض نظيف ومناسب لواجهات المحلات الفاخرة.",
    material: "platinum fiberglass",
    material_ar: "فايبر جلاس بلاتيني",
    tone: "#f8fafc",
    pose: "standing",
  },
  {
    id: "editorial-pose",
    name: "Editorial Display Body",
    name_ar: "مانيكان عرض بارز",
    summary: "A stronger shoulder line for fashion and hero products.",
    summary_ar: "خط كتف أقوى لعرض القطع المهمة ولبس الموضة.",
    material: "brushed steel finish",
    material_ar: "تشطيب ستيل مطفي",
    tone: "#cbd5e1",
    pose: "editorial",
  },
  {
    id: "modular-form",
    name: "Modular Retail Form",
    name_ar: "فورمة عرض مرنة",
    summary: "A flexible concept for compact shop floors and fast resets.",
    summary_ar: "اختيار مرن للمحلات الصغيرة وتغيير العرض بسرعة.",
    material: "soft graphite shell",
    material_ar: "قشرة جرافيت هادية",
    tone: "#94a3b8",
    pose: "modular",
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

function MannequinConcept({ concept }: { concept: Concept }) {
  const groupRef = useRef<THREE.Group>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: concept.tone,
        metalness: concept.pose === "modular" ? 0.34 : 0.62,
        roughness: concept.pose === "editorial" ? 0.28 : 0.38,
        envMapIntensity: 0.8,
      }),
    [concept],
  );
  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111827",
        metalness: 0.5,
        roughness: 0.44,
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.72) * 0.04;
  });

  const shoulderTilt = concept.pose === "editorial" ? -0.16 : 0;
  const shoulderWidth = concept.pose === "editorial" ? 0.92 : 0.82;
  const hipWidth = concept.pose === "modular" ? 0.44 : 0.5;
  const armDrop = concept.pose === "editorial" ? 0.5 : 0.44;
  const legOffset = concept.pose === "editorial" ? 0.18 : 0.1;

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.7, 0]} rotation={[0, 0.05, shoulderTilt]}>
        <mesh material={material} position={[0, 2.22, 0]} scale={[0.82, 1.08, 0.72]}>
          <sphereGeometry args={[0.3, 64, 64]} />
        </mesh>
        <mesh material={material} position={[0, 1.82, 0]} scale={[0.86, 1, 0.72]}>
          <cylinderGeometry args={[0.12, 0.15, 0.38, 32]} />
        </mesh>
        <mesh material={material} position={[0, 1.34, 0]} scale={[shoulderWidth, 0.2, 0.34]}>
          <sphereGeometry args={[0.72, 64, 64]} />
        </mesh>
        <mesh material={material} position={[0, 0.86, 0]} scale={[0.62, 0.92, 0.3]}>
          <sphereGeometry args={[0.78, 64, 64]} />
        </mesh>
        <mesh material={material} position={[0, 0.18, 0]} scale={[hipWidth, 0.5, 0.27]}>
          <sphereGeometry args={[0.62, 48, 48]} />
        </mesh>
        <mesh material={material} position={[-0.62, armDrop, 0]} rotation={[0, 0, 0.08]}>
          <capsuleGeometry args={[0.075, 1.42, 18, 36]} />
        </mesh>
        <mesh material={material} position={[0.62, armDrop, 0]} rotation={[0, 0, -0.08]}>
          <capsuleGeometry args={[0.075, 1.42, 18, 36]} />
        </mesh>
        <mesh material={material} position={[-0.19 - legOffset, -0.82, 0]} rotation={[0.02, 0, -0.04]}>
          <capsuleGeometry args={[0.095, 1.78, 18, 36]} />
        </mesh>
        <mesh material={material} position={[0.19 + legOffset, -0.82, 0]} rotation={[-0.02, 0, 0.04]}>
          <capsuleGeometry args={[0.095, 1.78, 18, 36]} />
        </mesh>
        <mesh material={darkMaterial} position={[0, -1.72, 0]} scale={[1.46, 0.06, 0.76]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={darkMaterial} position={[0, -1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.012, 16, 96]} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneStage({ concept }: { concept: Concept }) {
  return (
    <Canvas
      className="hero-3d-canvas"
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.0, 5.4], fov: 36 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0f111a"]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 4]} intensity={2.3} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#cbd5e1" />
      <spotLight position={[0, 5, 2]} angle={0.5} intensity={2.2} penumbra={0.8} color="#ffffff" />
      <Suspense fallback={null}>
        <MannequinConcept concept={concept} />
      </Suspense>
      <mesh position={[0, -2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 96]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.25} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.18} maxPolarAngle={1.48} />
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
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-x-8 top-14 bottom-24 border border-white/10 bg-black/20" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/[0.055] blur-3xl" />

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border-metallic pb-4 text-xs uppercase text-text-secondary">
        <span>{pickLocalized(locale, { en: "Real 3D display concepts", ar: "عرض 3D للمانيكانات" })}</span>
        <span>{pickLocalized(locale, { en: "Replaceable asset slot", ar: "جاهز لملفات 3D الحقيقية" })}</span>
      </div>

      <div className="absolute inset-x-0 top-10 h-[420px]">
        {webglReady === false ? (
          <MannequinLoader className="h-full" label="3D preview fallback" labelAr="بديل عرض 3D" />
        ) : (
          <SceneStage concept={concept} />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mb-4 grid grid-cols-3 gap-2">
          {concepts.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 border transition ${index === activeIndex ? "border-white bg-white" : "border-white/20 bg-white/[0.04]"}`}
              aria-label={pickLocalized(locale, { en: `Show ${item.name}`, ar: `اعرض ${item.name_ar}` })}
            />
          ))}
        </div>
        <div className="glass-panel rounded-md p-4">
          <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: concept.material, ar: concept.material_ar })}</p>
          <h2 className="mt-2 font-headline text-3xl text-white">{pickLocalized(locale, { en: concept.name, ar: concept.name_ar })}</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: concept.summary, ar: concept.summary_ar })}</p>
        </div>
      </div>
    </div>
  );
}
