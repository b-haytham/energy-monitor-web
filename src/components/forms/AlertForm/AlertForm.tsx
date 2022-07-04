import { 
  Box, 
  Button, 
  Divider, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppSelector } from "@redux/store";

import { Device } from "@api/types/device";
import { Alert, AlertCondition } from "@api/types/alert";
import { useState } from "react";
import { Value } from "@api/types/value";

interface AlertFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: Alert;
}

const AlertForm = ({ onSubmit, onCancel, initialValues }: AlertFormProps) => {
  const devices = useAppSelector(state => state.devices.devices);
  const loggedInUser = useAppSelector(state => state.auth.user); 
  
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(() => {
    const device = initialValues?.device as Device || null
    return device;
  }) 

  const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        device: (initialValues?.device as Device)?._id ?? "",
        value_name: initialValues?.value_name ?? "",
        if: {
          condition: initialValues?.if?.condition ?? AlertCondition.GREATER_THAN,
          value: initialValues?.if?.value ?? 0
        }
      } 
  });

  const onSubmitForm = (data: any) => {
    onSubmit({
      user: loggedInUser?._id ?? null, 
      ...data, 
      if: { ...data.if, value: +data.if.value }
    });
  }

  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>

        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel id="device-label">Device</InputLabel>
          <Select
            id="device"
            labelId="device-label"
            label="Device"
            value={watch("device")}
            onChange={(e) => {
              setValue("device", e.target.value)
              const device = devices.find(device => device._id == e.target.value);
              setSelectedDevice(device || null)
            }}
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {devices.map((device) => (
              <MenuItem key={device._id} value={device._id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 1 }} />
        
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel id="value-label">Value name</InputLabel>
          <Select
            id="value_name"
            labelId="value-label"
            label="Value name"
            value={watch("value_name")}
            onChange={(e) => setValue("value_name", e.target.value)}
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {selectedDevice && (selectedDevice.values as Value[]).map((value) => (
              <MenuItem key={value._id} value={value.accessor}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body1" fontWeight='bold' sx={{ mb: 2 }}> If (value) </Typography>
         
        <Stack spacing={1} direction='row'>
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
            <InputLabel id="condition-label">Condition</InputLabel>
            <Select
              id="condition"
              labelId="condition-label"
              label="condition"
              value={watch("if.condition")}
              onChange={(e) => setValue("if.condition", e.target.value as AlertCondition)}
            >
                <MenuItem value={AlertCondition.GREATER_THAN}>
                  {"Greater Than (>)"}
                </MenuItem>
                <MenuItem value={AlertCondition.LESS_THAN}>
                  {"Less Than (<)"}
                </MenuItem>
                <MenuItem value={AlertCondition.EQUALS}>
                  {"Equals (=)"}
                </MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            id="value"
            label="Value"
            variant="outlined" 
            required
            type="number"
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            {...register('if.value' )}
          />
        </Stack>

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
  );
}

export default AlertForm;
