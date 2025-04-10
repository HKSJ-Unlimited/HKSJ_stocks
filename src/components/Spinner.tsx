import { Loader } from "lucide-react";

export default function Spinner({ size = 20 }: { size?: number }) {
    return (
        <div className="flex justify-center items-center animate-spin-slow">
            <Loader size={size} />
        </div>
    );
}
