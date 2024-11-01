import { ModeToggle } from "@/components/mode-toggle";
import { Timer } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Timer className="size-6" />
      <ModeToggle />
    </header>
  );
}
