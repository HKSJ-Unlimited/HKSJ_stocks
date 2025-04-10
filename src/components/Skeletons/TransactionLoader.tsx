import { Skeleton } from "../ui/skeleton";

export default function TransactionnLoader() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="flex self-end mr-2 h-[32px] w-[72px] rounded-md" />
            <Skeleton className="h-[40px] rounded-md" />
            {
                Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[37px] rounded-md" />
                ))}
        </div>
    )
}