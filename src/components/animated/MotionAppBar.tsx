import React from 'react';

import { AppBar, AppBarProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

//@ts-ignore
const MAppBar = React.forwardRef((props: AppBarProps & MotionProps, ref) => <AppBar ref={ref} {...props} />);
MAppBar.displayName = "MAppBar";

const MotionAppBar = motion(MAppBar);

export default MotionAppBar;
