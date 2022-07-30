//@ts-nocheck

import { SVGProps } from "react";

import { motion } from 'framer-motion'

interface LogoProps extends SVGProps<SVGSVGElement> {}

const Logo = (props: LogoProps) => {
  return (
    <svg
        width={454.491}
        height={454.491}
        viewBox="0 0 120.251 120.251"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g transform="translate(-41.058 -63.189)">
          <motion.circle
            style={{
              fill: "#3950ac",
              fillOpacity: 1,
              strokeWidth: 0.264583,
              margin: 2
            }}
            cx={101.183}
            cy={123.314}
            r={60.125}
            animate={{
              scale: [.99,1,.99]
            }}
            transition={{ type: 'tween', repeat: Infinity }}
          />
          <circle
            style={{
              fill: "#556cd6",
              fillOpacity: 1,
              strokeWidth: 0.440078,
            }}
            cx={100.979}
            cy={123.823}
            r={42.067}
          />
          <motion.path
            style={{
              fill: "#fff",
              fillOpacity: 1,
              strokeWidth: 0.239197,
            }}
            d="M111.902 95.904h14.761l-15.963 32.1-14.053-.616-17.429 30.187 5.42-41.46 16.116-.04z"
            animate={{ rotate: [-2, 0, -2] }}
            transition={{ type: 'spring', repeat: Infinity, bounce: 982 }}
          />
        </g>
      </svg>
  )
}

export default Logo;
