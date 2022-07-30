import React from 'react';

import { Box, BoxProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

const MBox = React.forwardRef((props: BoxProps & MotionProps, ref) => <Box ref={ref} {...props} />);
MBox.displayName = "MBox";

const MotionBox = motion(MBox);

export default MotionBox;
