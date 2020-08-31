import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

interface Props {
  title?: string;
  cases?: number;
  total?: number;
}

const Infobox: React.FC<Props> = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className="infobox_cases">{cases}</h2>
        <Typography className="infobox_total" color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default Infobox;
