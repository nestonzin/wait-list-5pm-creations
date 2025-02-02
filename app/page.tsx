"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Mail, Phone } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useFormStatus } from "react-dom";
import { addToWaitlist } from "./actions/waitlist";
import { useToast } from "@/hooks/use-toast";

const WishlistItem = ({
  name,
  description,
  isChecked,
  onCheckChange,
}: {
  name: string;
  description: string;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}) => {
  return (
    <div className="mb-4 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center">
        <div
          className={`mr-4 h-6 w-6 cursor-pointer border-4 border-black ${
            isChecked ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => onCheckChange(!isChecked)}
        >
          {isChecked && <Check className="h-4 w-4 text-white" />}
        </div>
        <div>
          <h3 className="font-bold uppercase">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  icon,
  placeholder,
  type,
  name,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4 flex items-center border-4 border-black bg-white p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="ml-2 w-full bg-transparent font-mono text-black placeholder-gray-500 focus:outline-none"
    />
  </div>
);

function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isDisabled}
      className="mt-6 flex w-full items-center justify-center rounded-none border-4 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] disabled:opacity-50"
    >
      {pending ? "Enviando..." : "Entrar pra lista de espera"}
    </button>
  );
}

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isWishlistChecked, setIsWishlistChecked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const CLICK_WINDOW = 3000; // 3 seconds window to count rapid clicks

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const wishlistItems = [
    {
      name: "CodeMaster 3000",
      description: "Advanced IDE for professional developers",
    },
  ];

  async function handleSubmit(formData: FormData) {
    if (isTimeout) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde 60 segundos antes de tentar novamente.",
      });
      return;
    }

    const now = Date.now();
    if (now - lastClickTime > CLICK_WINDOW) {
      // If more than 3 seconds passed, reset the counter
      setClickCount(1);
    } else {
      setClickCount((prev) => prev + 1);
    }
    setLastClickTime(now);

    if (clickCount >= 4) {
      setIsTimeout(true);
      toast({
        title: "Limite atingido",
        description: "Muitas tentativas rápidas. Aguarde 60 segundos.",
      });

      setTimeout(() => {
        setIsTimeout(false);
        setClickCount(0);
      }, 60000);

      return;
    }


    const result = await addToWaitlist(formData);
    if (result.success) {
      toast({
        title: "Sucesso!",
        description: "Você foi adicionado à lista de espera.",
      });
      formRef.current?.reset();
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar você à lista de espera.",
      });
    }
  }

  return (
    <>
      {/* {!isMobile && (
        <div className="video-wrapper">
          <iframe
            className="fixed inset-0 w-full h-full object-cover -z-10"
            src="https://www.youtube.com/embed/WE9dOwbRS2o?autoplay=1&mute=1&controls=0&loop=1&playlist=WE9dOwbRS2o&start=0&end=90&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              pointerEvents: "none",
            }}
          ></iframe>
          <style jsx>{`
            .video-wrapper iframe {
              width: 300%;
              height: 300%;
              top: -100%;
              left: -100%;
            }
            .video-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              overflow: hidden;
              z-index: -1;
            }
          `}</style>
        </div>
      )} */}

      <div
        className={`min-h-screen flex flex-col justify-center items-center p-8 font-mono text-black ${
          isMobile ? "bg-neutral-100" : ""
        }`}
      >
        <div className="mx-auto max-w-2xl rounded-lg border-8 w-full border-black bg-gray-200 p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <div className="mb-8 flex items-center justify-between border-b-4 border-black pb-4">
            <h1 className="text-4xl font-bold">5PM CREATIONS</h1>
            <Monitor className="h-10 w-10" />
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold uppercase">
            <TypingAnimation>Junte-se aos primeiros.</TypingAnimation>
          </h2>

          <form ref={formRef} action={handleSubmit}>
            <div className="mb-6">
              <Input
                icon={<Mail className="h-5 w-5" />}
                placeholder="Adicione seu e-mail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={<Phone className="h-5 w-5" />}
                placeholder="Adicione seu telefone"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {wishlistItems.map((item, index) => (
              <WishlistItem
                key={index}
                name={item.name}
                description={item.description}
                isChecked={isWishlistChecked}
                onCheckChange={setIsWishlistChecked}
              />
            ))}
            <SubmitButton
              isDisabled={!(email || phone) || !isWishlistChecked || isTimeout}
            />
          </form>
        </div>
      </div>
    </>
  );
}
