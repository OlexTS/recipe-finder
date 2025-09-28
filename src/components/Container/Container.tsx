import type { ReactNode } from "react";
import css from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
