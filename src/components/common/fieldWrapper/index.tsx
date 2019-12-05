import { Paper } from "@material-ui/core";
import HeaderTitle from "components/common/headerTitle";
import React from "react";
import "./style.scss";
interface Props {
  headerTitle: string;
  children?: JSX.Element | JSX.Element[];
}
const FieldWrapper = ({ headerTitle, children }: Props) => {
  return (
    <Paper className="field-wrapper">
      <HeaderTitle>{headerTitle}</HeaderTitle>
      <div className="field-wrapper-content">{children}</div>
    </Paper>
  );
};

export default FieldWrapper;
