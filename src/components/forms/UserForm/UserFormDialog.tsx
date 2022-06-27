import { User } from "@api/types/user"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import UserForm from "./UserForm"

interface UserFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialValues?: User
}

const UserFormDialog = ({ open, onClose, onSubmit, initialValues }: UserFormDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>{initialValues ? "Update User" : "Create User"}</DialogTitle>
      <DialogContent>
        <UserForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  )
}

export default UserFormDialog
