import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getWeatherData } from "../../API/weather";

const Today = () => {
  const router = useRouter();
  const { longitude, latitude } = router.query;
  const weatherData = useQuery("weatherData", () => getWeatherData(latitude, longitude));
  console.log(weatherData);
  return <div>Today</div>;
};

export default Today;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("weatherData", () => getWeatherData(context.query.latitude, context.query.longitude));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
