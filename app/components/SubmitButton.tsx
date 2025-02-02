import { useFormStatus } from "react-dom";

export function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
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
