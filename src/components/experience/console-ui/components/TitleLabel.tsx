import { IoCaretDownSharp } from "react-icons/io5";

export default function TitleLabel({ title }: { title: string }) {
  return (
    <div className="flex h-fit w-fit flex-col items-center overflow-hidden">
      <p className="bg-foreground text-background w-fit rounded-md px-4 py-1.5 text-balance">
        {title}
      </p>
      <IoCaretDownSharp className="text-foreground absolute top-7.5" />
    </div>
  );
}
