import { useDisclosure } from "@mantine/hooks";

import { 
  IconButton, 
  InputAdornment, 
  OutlinedTextFieldProps, 
  TextField, 
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import React from "react";

interface PasswordInputProps extends OutlinedTextFieldProps {}

 const PasswordInput = React.forwardRef(({ InputProps,...rest }: PasswordInputProps, ref) => {
  const [passwordVisible, passwordVisibitiy] = useDisclosure(false);
  return (
    <TextField 
      //@ts-ignore
      ref={ref}
      id="password" 
      fullWidth 
      label="Password" 
      type={passwordVisible ? "text" : "password"} 
      sx={{ mb: 2 }}
      InputProps={{
        sx: { borderRadius: 2, ...InputProps?.sx },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={passwordVisibitiy.toggle}>
              {passwordVisible ? 
                <VisibilityOffOutlined fontSize="small" /> : 
                <VisibilityOutlined fontSize="small" />
              }
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps
      }}
      {...rest}
    />
  )
})

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
