import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function infoBox({ active,title, cases, total, ...props }) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'}`}>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2>+{cases}</h2>
        <Typography color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default infoBox;
