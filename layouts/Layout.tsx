import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.LayoutRoot}>{children}</div>;
};

export default Layout;
