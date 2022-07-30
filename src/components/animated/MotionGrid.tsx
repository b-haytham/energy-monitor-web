import React from 'react';

import { Grid, GridProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

//@ts-ignore
const MGrid = React.forwardRef((props: GridProps & MotionProps, ref: React.RefObject<HTMLDivElement>) => <Grid ref={ref} {...props} />);
MGrid.displayName = "MGrid";

const MotionGrid = motion(MGrid);

export default MotionGrid;
