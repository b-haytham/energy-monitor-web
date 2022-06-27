import { Device } from "@api/types/device"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import DeviceForm from "./DeviceForm"

interface DeviceFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialValues?: Device
}

const DeviceFormDialog = ({ open, onClose, onSubmit, initialValues }: DeviceFormDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>{initialValues ? "Update Device" : "Create Device"}</DialogTitle>
      <DialogContent>
        <DeviceForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DeviceFormDialog
