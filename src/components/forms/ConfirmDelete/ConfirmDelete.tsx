import { 
    Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Typography 
} from "@mui/material"

interface ConfirmDeleteProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDeleteDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  title, 
  content 
}: ConfirmDeleteProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={onClose}>Cancel</Button>
        <Button variant="text"onClick={onSubmit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
