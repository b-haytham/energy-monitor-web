import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface SubscriptionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SubscriptionForm = ({ onSubmit, onCancel } : SubscriptionFormProps) => {
  const { register, handleSubmit, errors } = useForm({
      defaultValues: {
        name: "",
      }
  });

  return (
    <form>
      <TextField 
        id="name"
        label="Name" 
        variant="outlined" 
        margin="normal"
        required
        fullWidth
        size="small"
        {...register('name' )}
      />
      <Stack spacing={1} direction='row' justifyContent='flex-end'> 
        <Button 
          variant="outlined" 
          color="primary"
          onClick={onCancel}
        >
          Cancel 
        </Button>
        <Button 
          type="submit" 
          variant="outlined" 
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Submit 
        </Button>
      </Stack>
    </form>
  )
}

export default SubscriptionForm;
