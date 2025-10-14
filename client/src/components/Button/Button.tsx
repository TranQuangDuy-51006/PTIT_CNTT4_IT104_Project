import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { useMemo, type ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  bd_gray?: boolean;
  primary?: boolean;
  maxcontent?: boolean;
  success?: boolean;
};

export default function Button(props: ButtonProps) {
  const className = useMemo(
    () =>
      clsx(styles.btn, {
        [styles.bd_gray]: props.bd_gray,
        [styles.primary]: props.primary,
        [styles.maxcontent]: props.maxcontent,
        [styles.success]: props.success,
      }),
    [props.bd_gray, props.primary, props.maxcontent, props.success]
  );
  if (props.href) {
    return (
      <Link className={className} to={props.href}>
        {props.children}
      </Link>
    );
  }
  return <button className={className}>{props.children}</button>;
}
