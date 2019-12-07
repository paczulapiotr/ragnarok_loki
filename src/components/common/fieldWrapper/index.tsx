import { Paper } from "@material-ui/core";
import HeaderTitle from "components/common/headerTitle";
import React from "react";
import "./style.scss";
interface Props {
  className?: string;
  headerTitle: string;
  children?: JSX.Element | JSX.Element[];
}
const FieldWrapper = ({ className, headerTitle, children }: Props) => {
  return (
    <Paper className={"field-wrapper " + className}>
      <HeaderTitle>{headerTitle}</HeaderTitle>
      <div className="field-wrapper-content">{children}</div>
    </Paper>
  );
};

export default FieldWrapper;
