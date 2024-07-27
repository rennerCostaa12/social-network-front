import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { ModalDialog } from "../ModalDialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export const CardProfile = () => {
  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader>
        <CardTitle className="text-center">Seu perfil</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-center items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/img-default-profile-man.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-md text-muted-foreground">@johndoe</p>
            <p className="text-sm text-muted-foreground">Masculino</p>
          </div>
        </div>
        <div>
          <p className="text-sm max-sm:text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
            error accusantium nemo aliquam delectus modi illo nulla iusto
            tenetur voluptatum, eius ut dolore laborum. Quam dignissimos
            perferendis molestias autem accusantium. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Hic blanditiis odit, rem non velit,
            nam iusto quaerat illo perspiciatis corrupti eos pariatur. Labore
            quas ratione autem, obcaecati est velit facilis!
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold">120</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </div>
          <div>
            <p className="text-lg font-bold">350</p>
            <p className="text-sm text-muted-foreground">Seguindo</p>
          </div>
          <div>
            <p className="text-lg font-bold">72</p>
            <p className="text-sm text-muted-foreground">Postagens</p>
          </div>
        </div>
        <ModalDialog
          title="Editar Perfil"
          elementStart={<Button variant="outline">Editar Perfil</Button>}
          elementContent={
            <div>
              <div className="my-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>

              <div className="my-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input id="username" />
              </div>

              <div className="my-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gênero</SelectLabel>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          elementFooter={<Button>Salvar dados</Button>}
        />
      </CardContent>
    </Card>
  );
};
