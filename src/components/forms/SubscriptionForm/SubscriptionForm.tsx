import { Subscription } from "@api/types/subscription";
import { 
  Button, 
  Stack, 
  TextField, 
  Box, 
  Divider, 
  FormControl, 
  Select, 
  InputLabel, 
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { useAppSelector } from "@redux/store";

import { useForm } from "react-hook-form";

interface SubscriptionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: Subscription;
}

const SubscriptionForm = ({ onSubmit, onCancel, initialValues } : SubscriptionFormProps) => {
  const users = useAppSelector((state) => {
    if(initialValues) {
      return state.users.users.filter((user) => user.role.includes('user'));
    }else {
      return state.users.users
      .filter((user) => user.role.includes("user") && !user.subscription)
    }
  });

  const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        // @ts-ignore
        admin: initialValues?.admin._id ?? "" ,
        company_info: {
          name: initialValues?.company_info?.name ?? "",
          email: initialValues?.company_info?.email ?? "",
          phone: initialValues?.company_info?.phone ?? "",
          address: {
            street: initialValues?.company_info?.address?.street ?? "",
            city: initialValues?.company_info?.address?.city ?? "",
            state: initialValues?.company_info?.address?.state ?? "",
            zip: initialValues?.company_info?.address?.zip ?? 0,
            country: "Tunisie"
          }
        },
        blocked: initialValues?.blocked ?? false,
      }
  });
  
  const onSubmitForm = (data: any) => {
    // onSubmit({
    //   ...data,
    //   company_info: {
    //     ...data.company_info,
    //     address: {
    //       ...data.company_info.address,
    //       zip: parseInt(data.company_info.address.zip)
    //     }
    //   }
    // });
    onSubmit(data);
  }

  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>

        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <InputLabel id="admin-label">Administrateur</InputLabel>
          <Select
            id="admin"
            labelId="admin-label"
            label="Administrateur"
            value={watch("admin")}
            onChange={(e) => setValue("admin", e.target.value)}
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.first_name + " " + user.last_name}
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
          {...register('company_info.name' )}
        />

        <TextField 
          id="email"
          label="Email"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('company_info.email' )}
        />

        <TextField 
          id="phone"
          label="Phone"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('company_info.phone' )}
        />
       
        <Divider sx={{ mb: 1 }} />

        <TextField 
          id="country"
          label="Phone"
          variant="outlined" 
          required
          fullWidth
          size="small"
          disabled
          sx={{ mb: 1 }}
          {...register('company_info.address.country' )}
        />

        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} >
          <TextField 
            id="state"
            label="State"
            variant="outlined" 
            required
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            {...register('company_info.address.state' )}
          />

          <TextField 
            id="city"
            label="City"
            variant="outlined" 
            required
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            {...register('company_info.address.city' )}
          />
        </Stack>

        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} >
          <TextField 
            id="street"
            label="Street"
            variant="outlined" 
            required
            fullWidth
            size="small"
            sx={{ mb: 1, flex: 2 }}
            {...register('company_info.address.street' )}
          />

          <TextField 
            id="zip"
            label="Postal Code"
            variant="outlined" 
            required
            fullWidth
            size="small"
            type={'number'}
            sx={{ mb: 1, flex: 1 }}
            {...register('company_info.address.zip' )}
          />
        </Stack>

        <Divider sx={{ mt: 1  }} />

        {initialValues && (
          <>
            <FormControlLabel
              value="end"
              control={
                <Checkbox 
                  checked={watch('blocked')} 
                  onChange={(e) => setValue("blocked", e.target.checked)} 
                />
              }
              label="Blocked"
              labelPlacement="end"
            /> 
            <Divider sx={{ mb: 1 }} />
          </>
        )}
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

export default SubscriptionForm;
