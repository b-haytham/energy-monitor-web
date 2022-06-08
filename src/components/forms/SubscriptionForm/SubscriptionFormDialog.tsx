import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import SubscriptionForm from "./SubscriptionForm"

interface SubscriptionFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const SubscriptionFormDialog = ({ open, onClose, onSubmit }: SubscriptionFormDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Create new subscription</DialogTitle>
      <DialogContent>
        <SubscriptionForm 
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionFormDialog
