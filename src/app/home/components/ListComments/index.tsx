import { Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ListComments = () => {
  return (
    <div className="flex flex-col gap-4 p-4 max-h-[400px] overflow-auto">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-RC" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <audio
          className="w-full"
          controls
          src={"/audio-default.mp3"}
          typeof="audio/mpeg"
        />
      </div>
    </div>
  );
};
