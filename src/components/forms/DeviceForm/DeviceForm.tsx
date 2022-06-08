import { Device } from "@api/types/device";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material";
import { useAppSelector } from "@redux/store";
import { useForm } from "react-hook-form";

interface DeviceFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: Device;
}

const DeviceForm = ({ onSubmit, onCancel, initialValues }: DeviceFormProps) => {
  const subscriptions = useAppSelector(state => state.subscriptions.subscriptions);
  const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        name: initialValues?.name ?? "",
        description: initialValues?.description ?? "",
        type: initialValues?.type  ?? "TRI",
        subscription: initialValues ?  (initialValues.subscription as string) : "",
      }
  });
  
  const onSubmitForm = (data: any) => {
    onSubmit(data);
  }

  console.log(watch("type"));
  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>

        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel id="admin-label">Subscription</InputLabel>
          <Select
            id="subscription"
            labelId="admin-label"
            value={watch("subscription")}
            onChange={(e) => setValue("subscription", e.target.value)}
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {subscriptions.map((subscription) => (
              <MenuItem key={subscription._id} value={subscription._id}>
                {subscription.company_info.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ mb: 1 }} />

        <TextField 
          id="name"
          label="Name" 
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('name' )}
        />

        <TextField 
          id="description"
          label="Description"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('description' )}
        />


        <Divider sx={{ mb: 1 }} />
        <FormControl sx={{ ml: 1 }}>
          <FormLabel id="device-type-lable">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="device-type-lable"
            name="device-type-radio-group"
            value={watch("type")}
            onChange={(e) => setValue("type", e.target.value)}
          >
            <FormControlLabel value="TRI" control={<Radio />} label="Tri" />
            <FormControlLabel value="MONO" control={<Radio />} label="Mono" />
            <FormControlLabel value="PV" control={<Radio />} label="PV" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ mb: 1 }} />

        <Stack spacing={1} direction='row'> 
          <Button
            variant="outlined" 
            color="primary"
            sx={{ flex: 1 }}
            onClick={onCancel}
          >
            Cancel 
          </Button>
          <Button 
            type="submit" 
            variant="outlined" 
            color="primary"
            sx={{ flex: 1 }}
          >
            Submit 
          </Button>
        </Stack>
      </form>
    </Box>
  
  )
}

export default DeviceForm;
