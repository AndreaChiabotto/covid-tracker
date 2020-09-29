import React from "react";
import './InfoBox.scss';
import { Card, CardContent } from "@material-ui/core";

function InfoBox({ active,title, cases, total, ...props }) {
  return (
    <Card onClick={props.onClick} className={`InfoBox ${active && 'infoBox--selected'}`}>
      <CardContent>
        <h3>{title}</h3>
        <h2>+{cases}</h2>
        <p>{total} Total</p>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
