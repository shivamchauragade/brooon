import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User_data } from '@/constants/data';
import { MoreHorizontal, Trash, BadgeCheck, BadgeX } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { updateAssociationVerification } from '@/lib/api'; 

interface CellActionProps {
  data: User_data;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (deleteId !== null) {
      try {
        setLoading(true);
        console.log("Deleting user with ID:", deleteId);
        setTimeout(() => {
          setLoading(false);
          setOpen(false);
          setDeleteId(null);
        }, 1000);
      } catch (error) {
        console.error("Failed to delete user:", error);
        setLoading(false);
      }
    }
  };

  const handleClick = async (id: number, isVerified: boolean) => {
    try {
      await updateAssociationVerification(id, !isVerified);
      console.log(`Updated verification status for ID ${id}`);
      router.reload();
    } catch (error) {
      console.error('Failed to update verification status:', error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const canVerify = data.association_info && data.association_info.name;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {canVerify && (
            <DropdownMenuItem onClick={() => handleClick(data.id, data.is_verified)}>
              {data.is_verified ? (
                <>
                  <BadgeX className="mr-2 h-4 w-4" /> Unverify
                </>
              ) : (
                <>
                  <BadgeCheck className="mr-2 h-4 w-4" /> Verify
                </>
              )}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handleDeleteClick(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
