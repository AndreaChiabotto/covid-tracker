import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function infoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2>{cases}</h2>
        <Typography color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default infoBox;
