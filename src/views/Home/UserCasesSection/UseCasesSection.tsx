import { Box, Divider, Stack, Typography } from "@mui/material"

import UseCaseItem from "./UseCaseItem"

import { useCases } from "./useCases"

interface UseCasesSectionProps {}

const UseCasesSection = ({}: UseCasesSectionProps) => {
  return (
    <Box
      sx={{
        mt: 10,
        minHeight: "100vh",
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}
    > 
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ mb: 2 }} variant="h2"> Use cases</Typography>
        <Divider />
      </Box> 
      {useCases.map((useCase, idx) => (
        <UseCaseItem key={idx} useCase={useCase} index={idx} />
      ))}
    </Box>
  )
}

export default UseCasesSection
