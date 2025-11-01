import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface Props {
  cocktail: any;
}

export default function CocktailCard({ cocktail }: Props) {
  return (
    <Card className="w-full max-w-sm cocktail-card">
      <div className="cocktail-header">
        <img
          className="cocktail-image"
          src={cocktail.imageUrl}
          alt={cocktail.name}
        />
        <div className="card-title">
          <CardTitle className="title">{cocktail.name}</CardTitle>
          <CardDescription className="card-description">
            <Badge variant="outline">{cocktail.category}</Badge>
            <Badge variant="outline">{cocktail.glass}</Badge>
          </CardDescription>
        </div>
      </div>
      <CardContent className="card-content">
        {cocktail.instructions}
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
