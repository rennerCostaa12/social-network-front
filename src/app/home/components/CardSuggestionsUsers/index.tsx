"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useCardSuggestionUsers } from "./useCardSuggestionUsers";

export const CardSuggestionUsers = () => {
  const { handleFollow } = useCardSuggestionUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugestões para você</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4 justify-between">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/img-default-profile-woman.png" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-bold">Sarah Anderson</h4>
            <p className="text-xs text-muted-foreground">@sarahanderson</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleFollow}>
            Seguir
          </Button>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/img-default-profile-man.png" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-bold">Cuca Beludo</h4>
            <p className="text-xs text-muted-foreground">@cucabeludo</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleFollow}>
            Seguir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
