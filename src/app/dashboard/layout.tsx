"use client";

import { useSession } from "next-auth/react";
import {
  ArrowUpDown,
  ChartNoAxesCombined,
  ChevronFirst,
  ChevronLast,
  Gauge,
  TableProperties,
} from "lucide-react";
import Image from "next/image";
import React, { Suspense, useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import AddTransaction from "@/components/AddTransaction";
import { Toaster } from "@/components/ui/toaster"
import Spinner from "@/components/Spinner";

const SidebarItems = [
  {
    id: 1,
    name: "Positions",
    icon: <TableProperties />,
    route: "/dashboard/positions",
  },
  {
    id: 2,
    name: "Performance",
    icon: <Gauge />,
    route: "/dashboard/performance?metric=1",
  },
  {
    id: 3,
    name: "Worth",
    icon: <ChartNoAxesCombined />,
    route: "/dashboard/cashFlow",
  },
  {
    id: 4,
    name: "Transactions",
    icon: <ArrowUpDown />,
    route: "/dashboard/transactions",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const currentRoute = usePathname();
  const { data: session } = useSession();
  if (!session?.user) return null;
  const {
    user: { image, name },
  } = session;

  return (
    <div className="flex">
      <nav
        className={`flex h-screen max-w-56 flex-col bg-white shadow-lg transition-all duration-500 ${expanded ? "max-w-56" : "max-w-16"} overflow-hidden`}
      >
        <div className="mb-6 flex items-center gap-2 p-2">
          <Image
            src={
              image ??
              "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            }
            priority
            alt="profile"
            className={`rounded-full transition-all duration-500 ${expanded ? "max-w-56" : "max-w-0"} overflow-hidden`}
            width={50}
            height={50}
          />
          <p
            className={`text-sm transition-all duration-500 ${expanded ? "max-w-56" : "max-w-0"} overflow-hidden`}
          >
            {name}
          </p>
          <Button
            variant="outline"
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg p-1.5"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>
        {SidebarItems.map((item) => {
          const isActive = item.route.split("?").find(str => str === currentRoute)
          return (
            <Link
              href={item.route}
              key={item.id}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 hover:bg-gray-100 ${isActive ? "bg-gray-100" : ""}`}
            >
              <div>{item.icon}</div>
              <p
                className={`text-xs transition-all duration-500 ${expanded ? "max-w-56" : "max-w-0"} flex-wrap overflow-hidden`}
              >
                {item.name}
              </p>
            </Link>
          )
        })}
      </nav>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner size={100} />
        </div>
      }>
        <div className="p-2 mt-10 mx-2 flex w-full h-full">
          {children}
          <AddTransaction />
          <Toaster />
        </div>
      </Suspense>
    </div>
  );
}
