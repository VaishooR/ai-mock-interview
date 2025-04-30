import { Button } from "@/components/ui/button";
import { ArrowBigRight, ArrowRightToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center py-20 h-screen ">
      <div className="flex flex-col pt-22 px-10 border-4 border-green-400">
        <div className="flex justify-end">
          <Link href={'/dashboard'}>
            <Button className="bg-green-400 text-white cursor-pointer">Go To Dashboard <ArrowRightToLine/></Button>
          </Link>
        </div>
        <h1 className="text-8xl mt-12">AI MOCK INTERVIEW</h1>
      </div>
    </div>
  );
}
