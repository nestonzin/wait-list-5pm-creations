"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Monitor, Mail, Phone } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { addToWaitlist } from "./actions/waitlist";
import { useToast } from "@/hooks/use-toast";
import { useClickTimeout } from "./hooks/useClickTimeout";
import { Input } from "./components/Input";
import { WishlistItem } from "./components/WishlistItem";
import { SubmitButton } from "./components/SubmitButton";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isWishlistChecked, setIsWishlistChecked] = useState(false);
  const { isTimeout, handleClick } = useClickTimeout();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
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
    if (isTimeout || handleClick()) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde 60 segundos antes de tentar novamente.",
      });
      return;
    }

    if (isWishlistChecked) {
      formData.append("project_name", wishlistItems[0].name);
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
  );
}
