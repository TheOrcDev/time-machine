import TimeMachineForm from "@/components/time-machine-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-24 gap-10">
      <h1 className="text-4xl font-bold">Time Machine</h1>
      <TimeMachineForm />
    </div>
  );
}
