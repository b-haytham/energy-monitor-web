import { 
  Box, 
  Button, 
  Checkbox, 
  Divider, 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  InputLabel, 
  MenuItem, 
  Radio, 
  RadioGroup, 
  Select, 
  Stack, 
  TextField, 
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppSelector } from "@redux/store";
import { Subscription } from "@api/types/subscription";
import { Device } from "@api/types/device";
import { WarningOutlined } from "@mui/icons-material";
import Link from "@components/Link";

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
        subscription: initialValues ? (initialValues.subscription as Subscription)._id :  "",
        blocked: initialValues?.blocked ?? false
      } 
  });
  
  const onSubmitForm = (data: any) => {
    onSubmit(data);
  }

  const formDisabled = subscriptions.length == 0;

  return (
    <Box sx={{ mt: 1 }}>
      {formDisabled && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}> 
          <WarningOutlined color="error"/>
          <Typography variant="body2">
            To Create a new device first you need to create a 
            <Link sx={{ mx: 1 }} href="/admin/dash/subscriptions"><strong>Subscription</strong></Link>
          </Typography>
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl disabled={formDisabled} fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="admin-label">Subscription</InputLabel>
          <Select
            id="subscription"
            labelId="admin-label"
            label="Subscription"
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

        <Divider sx={{ mb: 2 }} />

        <TextField 
          id="name"
          label="Name" 
          variant="outlined" 
          required
          fullWidth
          disabled={formDisabled}
          size="small"
          sx={{ mb: 2 }}
          {...register('name' )}
        />

        <TextField 
          id="description"
          label="Description"
          variant="outlined" 
          required
          fullWidth
          disabled={formDisabled}
          size="small"
          sx={{ mb: 2 }}
          {...register('description' )}
        />


        <Divider sx={{ mb: 2 }} />
        <FormControl 
          sx={{ ml: 1, mb: 2 }}
          disabled={formDisabled}
        >
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


        {initialValues && (
          <Box>
            <FormControlLabel
              value="start"
              control={
                <Checkbox 
                  checked={watch('blocked')} 
                  onChange={(e) => setValue("blocked", e.target.checked)} 
                />
              }
              label="Blocked"
              labelPlacement="start"
              componentsProps={{ typography: { color: 'text.secondary' } }}
              sx={{ fontSize: 18, mx: 1, mb: 2 }}
            /> 
          </Box>
        )}
        <Divider sx={{ mb: 2 }} />
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
            disabled={formDisabled}
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
