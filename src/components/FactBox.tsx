import styles from "./FactBox.module.css";

declare type FactBoxProps = {
  config: Record<string, any>;
  children: React.ReactNode;
};

export const FactBox = ({ config, children }: FactBoxProps) => (
  <>
    <ins className={styles.factbox}>
      <strong className={styles.header}>
        {config.header?.length ? config.header : "Fact Box"}
      </strong>
      <br />
      {children}
    </ins>
  </>
);
