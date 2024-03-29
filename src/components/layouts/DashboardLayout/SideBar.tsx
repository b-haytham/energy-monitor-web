import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
} from "@mui/material";

import DashboardOutlined  from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import SideBarListItem from "./SideBarListItem";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { logout } from "@redux/auth/actions";
import socket from "src/socket";

interface SideBarProps {
  open: boolean;
}

const SideBar = ({ open }: SideBarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const accessToken = useAppSelector((state) => state.auth.access_token);

  return (
    <Drawer
      open
      variant="persistent"
      sx={{
        width: { md: "240px", xs: open ? '240px' : 0 },
        transition: "width 0.5s",
      }}
      PaperProps={{
        sx: {
          width: { md: "240px", xs: open ? '240px' :  0 },
          transition: "width 0.5s",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", px: 2, mt: 2 }}>
        <List>

          <SideBarListItem 
            selected={router.pathname === "/dash" || router.pathname === "/admin/dash"}
            text="Dashboard"
            icon={<DashboardOutlined />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash");
              } else {
                router.push("/dash");
              }
            }}
          />

          {userRole && !userRole.includes('user') && <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("subscriptions")}
            text="Subscriptions"
            icon={<AssignmentOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/subscriptions");
              } else {
                router.push("/dash/subscriptions");
              }
            }}
          />}

          <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("devices")}
            text="Devices"
            icon={<PrecisionManufacturingOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/devices");
              } else {
                router.push("/dash/devices");
              }
            }}
          />

          <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("reports")}
            text="Reports"
            icon={<InsightsOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/reports");
              } else {
                router.push("/dash/reports");
              }
            }}
          />

          <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("alerts")}
            text="Alerts"
            icon={<CampaignOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/alerts");
              } else {
                router.push("/dash/alerts");
              }
            }}
          />

          {userRole && userRole != 'user' && <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("users")}
            text="Users"
            icon={<PeopleAltOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/users");
              } else {
                router.push("/dash/users");
              }
            }}
          />}

          <SideBarListItem
            selected={router.pathname.includes("dash") && router.pathname.includes("settings")}
            text="Settings"
            icon={<SettingsOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/settings");
              } else {
                router.push("/dash/settings");
              }
            }}
          />
        </List>
        <Divider />
        <List>

          <SideBarListItem
            text="Logout"
            icon={<LogoutOutlinedIcon />}
            onClick={() => {
              if (userRole && accessToken) {
                if (userRole.includes("admin")) {
                  dispatch(logout({}))
                    .unwrap()
                    .then(() => {
                      socket.emit('logout', { access_token: accessToken })
                      router.push("/admin/auth/login");
                    });
                } else {
                  dispatch(logout({}))
                    .unwrap()
                    .then(() => {
                      socket.emit('logout', { access_token: accessToken })
                      router.push("/auth/login");
                    });
                }
              }
            }}
          />
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
