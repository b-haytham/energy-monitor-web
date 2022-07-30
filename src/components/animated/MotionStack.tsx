import React from 'react';

import { Stack, StackProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

const MStack = React.forwardRef((props: StackProps & MotionProps, ref) => <Stack ref={ref} {...props} />);
MStack.displayName = "MStack";

const MotionStack = motion(MStack);

export default MotionStack;
