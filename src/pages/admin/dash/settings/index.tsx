import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'

import PageHeader from '@components/PageHeader';
import { ExpandMoreOutlined } from '@mui/icons-material';

interface SettingsProps {
  
}

const Settings: NextPage<SettingsProps> = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title='Settings'
        onBack={() => router.back()}
      />
      <Box sx={{ mt: 2 }}>
        <Accordion variant="outlined" sx={{ borderRadius: 2, mb: 2 }} expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Credential Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion variant={"outlined"} sx={{ borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">Notification Settings</Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  return {
    props: {

    }
  }
}

export default Settings;
