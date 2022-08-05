import type { NextPage } from 'next';

import { Box } from '@mui/material';

import { Header, Footer } from '@components/layouts/MainLayout';

import ImagesSection from '@views/Home/ImagesSection';
import FeaturesSection from '@views/Home/FeaturesSection';
import UseCasesSection from '@views/Home/UserCasesSection';
import Hero from '@views/Home/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }}>

        {/* --------------------*/}
        <Hero /> 
        {/* <HeroWithBackground /> */ }
        {/* --------------------*/}

        {/* --------------------*/}
        <ImagesSection />
        {/* --------------------*/}

        {/* --------------------*/}
        <FeaturesSection />
        {/* --------------------*/}

        {/* --------------------*/}
        <UseCasesSection />
        {/* --------------------*/}

      </Box>
      <Footer />
    </>
  );
};

export default Home;
