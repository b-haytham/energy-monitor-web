import React from 'react';

import { Typography, TypographyProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

//@ts-ignore
const MTypography = React.forwardRef((props: TypographyProps & MotionProps, ref) => <Typography ref={ref} {...props} />);
MTypography.displayName = "MTypography";

const MotionTypography = motion(MTypography);

export default MotionTypography;
