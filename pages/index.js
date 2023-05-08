import Header from '@/src/components/Header/header';
import ComoFuncionaSection from '@/src/components/Sections/Como Funciona/comoFuncionaSection';
import HeroSection from '@/src/components/Sections/Hero/heroSection';
import ProjectSection from '@/src/components/Sections/Projeto/projectSection';
import SuporteSection from '@/src/components/Sections/Suporte/suporteSection';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Conheça o Raví</title>
                <meta name="description" content="Desenvolvido por Vítor Hugo usando Next" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Header />
            <HeroSection />
            <ProjectSection />
            <ComoFuncionaSection />
            <SuporteSection />
        </>
    );
}
