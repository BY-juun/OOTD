import React from "react";
import { QueryClient } from "react-query";

const Today = () => {
  return <div>Today</div>;
};

export default Today;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
}
