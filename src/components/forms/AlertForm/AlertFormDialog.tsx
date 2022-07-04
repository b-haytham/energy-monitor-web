import { Alert } from "@api/types/alert";
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import AlertForm from "./AlertForm";

interface AlertFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialValues?: Alert;
}

const AlertFormDialog = ({ open, onClose, onSubmit, initialValues }: AlertFormDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>{initialValues ? "Update Alert" : "Create Alert"}</DialogTitle>
      <DialogContent>
        <AlertForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AlertFormDialog
