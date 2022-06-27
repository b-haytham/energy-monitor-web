import { Subscription } from "@api/types/subscription"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import SubscriptionForm from "./SubscriptionForm"

interface SubscriptionFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialValues?: Subscription
}

const SubscriptionFormDialog = ({ open, onClose, onSubmit, initialValues }: SubscriptionFormDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>{initialValues ? "Update Subscription": "Create Subscription"}</DialogTitle>
      <DialogContent>
        <SubscriptionForm 
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionFormDialog
