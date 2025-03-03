import { Metadata } from "next"
import { GanchoContent } from "@/components/gancho/GanchoContent"

export const metadata: Metadata = {
  title: "Gancho | SafeCircle",
}

export default function GanchoPage() {
  return (
    <>
      <GanchoContent />
    </>
  );
}