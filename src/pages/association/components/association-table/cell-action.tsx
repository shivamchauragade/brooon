import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Associations_data } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { deleteAssociation, getAssociationByID } from '@/lib/api'; 
import PopupModal from '@/components/shared/popup-modal';
import AssociationCreateForm from '../association-forms/association-create-form';

interface CellActionProps {
  data: Associations_data;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [associationToEdit, setAssociationToEdit] = useState<Associations_data | null>(null);
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (deleteId !== null) {
      try {
        setLoading(true);
        await deleteAssociation(deleteId); 
        setLoading(false);
        setOpen(false);
        setDeleteId(null);
        router.reload(); 
      } catch (error) {
        console.error("Failed to delete user:", error);
        setLoading(false);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleEditClick = async (id: number) => {
    try {
      const association = await getAssociationByID(id);
      setAssociationToEdit(association);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch association:", error);
    }
  };

  useEffect(() => {
    if (associationToEdit) {
      setEditModalOpen(true);
    }
  }, [associationToEdit]);

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

          <DropdownMenuItem onClick={() => handleEditClick(data.id)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleDeleteClick(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PopupModal
        renderModal={(onClose) => (
          <AssociationCreateForm
            modalClose={onClose}
            associationToEdit={associationToEdit}
          />
        )}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <div />
      </PopupModal>
    </>
  );
};
