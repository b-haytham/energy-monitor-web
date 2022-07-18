import { Alert, AlertCondition } from "@api/types/alert";
import { Device } from "@api/types/device";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useAppSelector } from "@redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface AlertFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: Alert;
}

const AlertForm = ({ onSubmit, onCancel, initialValues }: AlertFormProps) => {
  const devices = useAppSelector(state => state.devices.devices);
  
  const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        device: (initialValues?.device as Device)?._id ?? "",
        value_name: initialValues?.value_name ?? "",
        if: {
          condition: initialValues?.if.condition ?? AlertCondition.GREATER_THAN,
          value: initialValues?.if.value ?? 0
        }
      } 
  });
  
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(() => {
    if(initialValues) {
      const device = devices.find(dev => dev._id == (initialValues.device as Device)._id);
      return device || null;
    }
    return null;
  })

  const onSubmitForm = (data: any) => {
    data.if.value = +data.if.value
    onSubmit(data);
  }
  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel id="device-label">Device</InputLabel>
          <Select
            id="device"
            labelId="device-label"
            label="device"
            value={watch("device")}
            onChange={(e) => {
              const device = devices.find(dev => dev._id == e.target.value);
              setValue("device", e.target.value)
              setSelectedDevice(device || null);
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

        <Divider sx={{ mb: 1 }} />
        <Typography sx={{ ml: 1, mb: 1 }} variant="h6"> IF </Typography>
         
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="value-label">Value name</InputLabel>
          <Select
            id="value_name"
            labelId="value-label"
            label="Value name"
            value={watch("value_name")}
            onChange={(e) => setValue("value_name", e.target.value)}
          >
            <MenuItem>
              <em>{!selectedDevice ? 'Pick device' : 'None'}</em>
            </MenuItem>
            {selectedDevice && selectedDevice.values.map((value) => (
              <MenuItem key={value.accessor} value={value.accessor}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
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

          <TextField id="value" label="Value" type="number"  {...register('if.value')} />
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
  )
}

export default AlertForm;
