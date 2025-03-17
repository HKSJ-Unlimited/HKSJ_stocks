import { Button } from "@/components/ui/button";
import { signOut } from "@/server/auth";
import React from "react";

function Dashboard() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Signout
      </Button>
    </div>
  );
}

export default Dashboard;
