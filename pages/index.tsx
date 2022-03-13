import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "./index.module.scss";

const Home: NextPage = () => {
  const router = useRouter();

  const onClickStart = useCallback(() => {
    router.push("/location");
  }, [router]);

  return (
    <>
      <Head>
        <title>오늘 뭐 입지?</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.title}>오늘 뭐 입지?</div>
          <div className={styles.description}>위치 기반 기온별 옷차림 추천 서비스</div>
          <button onClick={onClickStart}>시작하기</button>
        </div>
        <div className={styles.container_right}>
          <Image src="/mainImage.png" alt="mainImage" layout="fill" />
        </div>
      </div>
    </>
  );
};

export default Home;
