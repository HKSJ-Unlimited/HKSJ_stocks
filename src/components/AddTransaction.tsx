import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionForm } from "./Form";

const AddTransaction = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="absolute bottom-0 right-0 m-8 p-7 max-w-5 max-h-5 rounded-full">
                    <p className="text-2xl">+</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New transaction</DialogTitle>
                    <DialogDescription>Enter details for your transaction</DialogDescription>
                </DialogHeader>
                <TransactionForm />
            </DialogContent>
        </Dialog>
    );
}

export default AddTransaction;