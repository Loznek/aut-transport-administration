import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import useToggle from '../../core/hooks/use-toggle.ts';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog.tsx';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

interface DeleteIconButtonWithDialogProps {
  onDelete: () => Promise<void>;
  dialogTitle: string;
  dialogDescription?: string;
  isLoading?: boolean;
}

const DeleteIconButtonWithDialog = ({
  onDelete,
  dialogTitle,
  dialogDescription,
  isLoading,
}: DeleteIconButtonWithDialogProps) => {
  const { t } = useTranslation();
  const [isDeleteConfirmDialogOpen, toggleDeleteConfirmDialogOpen] = useToggle();

  const handleDelete = useCallback(async () => {
    await onDelete();
    toggleDeleteConfirmDialogOpen();
  }, [onDelete, toggleDeleteConfirmDialogOpen]);

  return (
    <>
      <IconButton onClick={toggleDeleteConfirmDialogOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmDialog
        open={isDeleteConfirmDialogOpen}
        title={dialogTitle}
        description={dialogDescription}
        onConfirm={handleDelete}
        onCancel={toggleDeleteConfirmDialogOpen}
        confirmButtonLabel={t('common.delete')}
        cancelButtonLabel={t('common.cancel')}
        isConfirmButtonLoading={isLoading}
      />
    </>
  );
};

export default DeleteIconButtonWithDialog;
