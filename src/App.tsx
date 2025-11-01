import React from "react";
import Cocktails from "@/components/cocktails/Cocktails";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function App() {
  return <Cocktails />;
}
