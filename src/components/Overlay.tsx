import { Scroll, useScroll } from "@react-three/drei";
import { cn } from "../shared/utils";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

// Section Component
interface SectionProps {
  children: React.ReactNode;
  right?: boolean;
  opacity?: number;
}

const Section = ({ children, right, opacity }: SectionProps) => {
  return (
    <section
      className={cn(
        " h-screen w-screen max-w-6xl flex flex-col justify-center p-10",
        right ? "items-start" : "items-end"
      )}
      style={{ opacity: opacity ?? 1 }}
    >
      <div className="max-w-sm w-full">
        <div className="bg-[#fefefe]/80 shadow-xl border border-gray-200 rounded-2xl px-4 py-6">
          {children}
        </div>
      </div>
    </section>
  );
};

// Tag Component
const pastelColors = [
  "#FFD6E0", // pink
  "#D6FFFB", // aqua
  "#FFFACD", // lemon
  "#E0FFD6", // mint
  "#D6E0FF", // lavender
  "#FFEFD6", // peach
  "#F6D6FF", // lilac
  "#D6FFF6", // turquoise
];

function getRandomPastelColor(label: string) {
  // Use label to get consistent color per tag
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

const Tag = ({ label }: { label: string }) => {
  const bg = getRandomPastelColor(label);
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
      style={{
        background: bg,
        color: "#222",
      }}
    >
      {label}
    </span>
  );
};

// ContactItem Component
const ContactItem = ({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link: string;
}) => (
  <p className="text-sm">
    <span className="font-medium">{label}:</span>{" "}
    <a href={link} target="_blank" className="underline text-blue-600">
      {value}
    </a>
  </p>
);

// Main Overlay
export const Overlay = () => {
  const scroll = useScroll();

  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityThirdSection, setOpacityThirdSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityThirdSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div className="w-screen h-fit flex flex-col items-center">
        <Section right opacity={opacityFirstSection}>
          <div className="font-serif text-2xl text-gray-800 mb-4">
            Experiencia y Certificaciones
          </div>
          <div className="text-base mb-1 text-gray-500">
            Ene 2022 - Actualidad
          </div>
          <div className="font-semibold text-gray-700 mb-1">
            Estudiante de Desarrollo Web
          </div>
          <div className="mb-3 text-sm text-gray-600">
            Aprendiendo y aplicando tecnologías web modernas para crear
            aplicaciones interactivas y eficientes.
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>
              <span className="font-medium">Desarrollo web:</span> HTML, CSS,
              TypeScript, Tailwind CSS, Three.js, r3f y Git.
            </li>
            <li>
              <span className="font-medium">Aprendizaje continuo:</span> Busco
              retos que expandan mi conocimiento técnico.
            </li>
            <li>
              <span className="font-medium">Proyectos personales:</span>{" "}
              Aplicaciones y colaboración en código abierto.
            </li>
          </ul>
        </Section>

        <Section opacity={opacitySecondSection}>
          <div className="font-serif text-2xl text-gray-800 mb-4">
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Astro",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Tailwind",
              "HTML",
              "CSS",
              "Git",
              "GitHub",
              "React",
              "Socket.io",
              "Three.js",
              "r3f",
              "GSAP",
            ].map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
        </Section>

        <Section right opacity={opacityThirdSection}>
          <div className="font-serif text-2xl text-gray-800 mb-4">Contacto</div>
          <div className="text-sm space-y-1 text-gray-700">
            <ContactItem
              label="Email"
              value="andres2004_cj@outlook.com"
              link="mailto:andres2004_cj@outlook.com"
            />
            <ContactItem
              label="GitHub"
              value="CastDev-j"
              link="https://github.com/CastDev-j"
            />
            <ContactItem
              label="LinkedIn"
              value="andres-castillo"
              link="https://www.linkedin.com/in/andres-castillo-jimenez-249210292/"
            />
            <ContactItem
              label="Twitter"
              value="@CastDev_J"
              link="https://x.com/CastDev_J"
            />
          </div>
        </Section>
      </div>
    </Scroll>
  );
};
