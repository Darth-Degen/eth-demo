import { AboutView } from "@components";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

//prevent lazy load and hydration error
const PageLayout = dynamic(
  () => import("../src/components/templates/PageLayout"),
  { ssr: false }
);

const About: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([false, false]);

  return (
    <PageLayout assets={assets}>
      <AboutView setAssets={setAssets} />
    </PageLayout>
  );
};

export default About;
