import { Subscription } from "@api/types/subscription";
import { User } from "@api/types/user";
import { 
  Box, 
  Button, 
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
import { useForm } from "react-hook-form";

interface UserFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialValues?: User;
}

const UserForm = ({ onSubmit, onCancel, initialValues }: UserFormProps) => {
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
      }
  });
  
  const onSubmitForm = (data: any) => {
    if(data.role !== 'user' && !initialValues) {
      data.subscription = null
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
          <><FormControl fullWidth size="small" sx={{ mb: 1 }}>
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
        <Divider sx={{ mb: 1 }} />
        </>}

        <TextField 
          id="first_name"
          label="First Name"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('first_name' )}
        />

        <TextField 
          id="last_name"
          label="Last Name"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('last_name' )}
        />

        <TextField 
          id="email"
          label="Email"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
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
          sx={{ mb: 1 }}
          {...register('password' )}
        />}

        <TextField 
          id="phone"
          label="Phone"
          variant="outlined" 
          required
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          {...register('phone' )}
        />
        <Divider sx={{ mb: 1 }} />
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
