import { Subscription } from "@api/types/subscription";
import { Role, User } from "@api/types/user";
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
  TextField 
} from "@mui/material";
import { useAppSelector } from "@redux/store";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

interface UserFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: User;
}

const UserForm = ({ onSubmit, onCancel, initialValues }: UserFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const subscriptions = useAppSelector(state => state.subscriptions.subscriptions);
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        first_name: initialValues?.first_name ?? "",
        last_name: initialValues?.last_name ?? "",
        email: initialValues?.email ?? "",
        password: "",
        subscription: initialValues ? (initialValues.subscription as Subscription)._id : "",
        role: initialValues?.role ?? "user",
        phone: initialValues?.phone ?? "",
        blocked: initialValues?.blocked ?? false
      }
  });
  
  const onSubmitForm = (data: any) => {
    if (!loggedInUser) {
      enqueueSnackbar("Something went wrong!", { variant: 'error' });
      return
    }
    if(data.role !== 'user' && !initialValues) {
      data.subscription = null
    }
    if(initialValues) {
      data.password = "password"
    }
    if(loggedInUser.role.includes('user')) {
      data.subscription = (loggedInUser.subscription as Subscription)._id;
      data.role = Role.USER;
    }

    console.log('USER FORM>>', data)
    onSubmit(data);
  }

  console.log(watch("role"));
  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {loggedInUser && 
          loggedInUser.role.includes('admin') && 
          watch("role") == 'user' && 
          <>
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
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
        </>
        }

        <TextField 
          id="first_name"
          label="First Name"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          {...register('first_name' )}
        />

        <TextField 
          id="last_name"
          label="Last Name"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          {...register('last_name' )}
        />

        <TextField 
          id="email"
          label="Email"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          {...register('email' )}
        />

        {!initialValues && <TextField 
          id="password"
          label="Password"
          variant="outlined" 
          required
          type="password"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          {...register('password' )}
        />}

        <TextField 
          id="phone"
          label="Phone"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          {...register('phone' )}
        />
        <Divider sx={{ mb: 1 }} />
        {loggedInUser && !loggedInUser.role.includes('user') && (
          <>
            <FormControl sx={{ ml: 1 }}>
            <FormLabel id="user-role-label">Role</FormLabel>
            <RadioGroup
              row
              aria-labelledby="user-role-label"
              name="user-role-radio-group"
              value={watch("role")}
              onChange={(e) => setValue("role", e.target.value)}
            >
              <FormControlLabel value="super_admin" control={<Radio />} label="Super Admin" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="super_user" control={<Radio />} label="Super User" />
            </RadioGroup>
            </FormControl>

            <Divider sx={{ mb: 1 }} />
          </>
        )}

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
              sx={{ ml: 0 }}
            /> 
            <Divider sx={{ my: 1 }} />
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

export default UserForm;
