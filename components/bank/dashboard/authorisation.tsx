import { db } from "@/services/db.ts";
import { Card } from "@/components/card.tsx";
import { ChevronRight } from "lucide-preact";

export function Authorisation({ company }: { company?: string }) {
  const items = db.prepare(
    `SELECT COUNT(*) as count FROM draft_payments WHERE status = 'authorisation'`,
  ).get() as unknown as { count: number };

  console.log("Count:", items.count);
  return (
    <Card className="px-6 pt-6 pb-3 grid grid-cols-2">
      <span class="text-sm block font-medium text-gray-700 pb-4 col-span-2">
        Authorisations needed
      </span>
      <a
        href={`/bank/${company}/transactions/pending`}
        class="hover:bg-gray-100 rounded -ml-2 pl-2 -mt-2 pt-2 mr-4 pb-2 group"
      >
        <span class="flex flex-row gap-2 group-hover:gap-4 items-center duration-150">
          Outgoing payments
          <ChevronRight size="12" />
        </span>
        <span class="text-4xl font-semibold">
          {items.count}
        </span>
      </a>
    </Card>
  );
}
