import { useState } from "react";

import { PageLayout } from "components";
import { ActiveAlertMap } from "features/active-alert-map";

const HomeScreen = () => {
  return (
    <PageLayout>
      <ActiveAlertMap />
    </PageLayout>
  );
};

export default HomeScreen;
