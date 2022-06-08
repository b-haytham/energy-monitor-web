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

interface SideBarProps {}

const SideBar = ({}: SideBarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.user?.role);

  return (
    <Drawer
      open
      variant="persistent"
      sx={{
        width: "240px",
      }}
      PaperProps={{
        sx: {
          width: "240px",
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
            selected={router.pathname.includes("dash") && router.pathname.includes("rapports")}
            text="Rapports"
            icon={<InsightsOutlinedIcon />}
            onClick={() => {
              if(userRole && userRole.includes("admin")) {
                router.push("/admin/dash/rapports");
              } else {
                router.push("/dash/rapports");
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
            text="User"
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
              if (userRole) {
                if (userRole.includes("admin")) {
                  dispatch(logout({}))
                    .unwrap()
                    .then(() => {
                      router.push("/admin/auth/login");
                    });
                } else {
                  dispatch(logout({}))
                    .unwrap()
                    .then(() => {
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
