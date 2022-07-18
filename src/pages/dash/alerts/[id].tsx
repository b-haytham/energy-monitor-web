import { NextPage } from "next"
import { useRouter } from "next/router";

import { Box } from "@mui/material";

import PageHeader from "@components/PageHeader";

interface AlertDetailsPageProps {}

const AlertDetailsPage: NextPage<AlertDetailsPageProps> = () => {
  const router = useRouter();
  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Alert Detail"
        onBack={() => router.back()}
      />

    </Box>
  )
}

export default AlertDetailsPage;
