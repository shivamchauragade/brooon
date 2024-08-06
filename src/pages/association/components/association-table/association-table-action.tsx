import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import AssociationCreateForm from '../association-forms/association-create-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
export default function AssociationTableActions() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Association Here" />
      </div>
      <div className="flex gap-3">
        <Button onClick={handleOpenModal} className="text-xs md:text-sm">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
        <PopupModal
          renderModal={(onClose) => <AssociationCreateForm modalClose={onClose} />}
          isOpen={isOpen}
          onClose={handleCloseModal}
        >
          <div />
        </PopupModal>
      </div>
    </div>
  );
}
