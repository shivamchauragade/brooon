import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '../ui/scroll-area';
import { ReactNode } from 'react';

type TPopupModalProps = {
  renderModal: (onClose: () => void) => React.ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function PopupModal({ renderModal, children, isOpen, onClose }: TPopupModalProps) {
  return (
    <>
      <div onClick={() => onClose()}>
        {children}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={'!bg-background !px-1'}
      >
        <ScrollArea className="h-[80dvh] px-6">
          {renderModal(onClose)}
        </ScrollArea>
      </Modal>
    </>
  );
}
