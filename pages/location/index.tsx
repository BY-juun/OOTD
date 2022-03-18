import Head from "next/head";
import React, { ReactElement, useCallback, useState } from "react";
import Map from "../../components/Map";
import Layout from "../../layouts/Layout";
import useCurrentLocation from "../../Utils/Hooks/useCurrentLocation";
import styles from "./index.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const Location = () => {
  const router = useRouter();
  const { location: UserLocation, error: Error } = useCurrentLocation(geolocationOptions);
  const [pos, setPos] = useState({ latitude: UserLocation?.latitude, longitude: UserLocation?.longitude });

  const Submit = useCallback(async () => {
    let submitData;
    if (pos.latitude === undefined && pos.longitude === undefined) {
      submitData = UserLocation;
    } else {
      submitData = pos;
    }
    router.push({
      pathname: "/today",
      query: {
        latitude: submitData?.latitude,
        longitude: submitData?.longitude,
      },
    });
  }, [UserLocation, pos, router]);

  return (
    <>
      <Head>
        <title>위치 선택</title>
      </Head>
      <div className={styles.locationRoot}>
        <div className={styles.title}>위치를 선택해주세요</div>
        {UserLocation && <Map location={UserLocation} setPos={setPos} />}
        <button onClick={Submit}>선택</button>
      </div>
    </>
  );
};

export default Location;

Location.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
