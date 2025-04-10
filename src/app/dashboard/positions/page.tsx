import React, { Suspense } from "react";
import PositionLoader from "@/components/Skeletons/PositionLoader";
import PositionTableContainer from "./table";

export default async function Position() {
  return <div className="flex-1 flex-col">
    <Suspense fallback={<PositionLoader />}>
      <PositionTableContainer />
    </Suspense>
  </div>;
}
