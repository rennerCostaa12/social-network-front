import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/components/Post";
import { CardProfileUsers } from "@/components/CardProfileUsers";

export default function SearchPosts({
  params,
}: {
  params: { search: string };
}) {
  return (
    <main className="p-5 max-md:pb-24">
      <Tabs defaultValue="account" className="my-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Contas</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-wrap gap-4 justify-center">
            <CardProfileUsers
              name="Renner Costa"
              username="rennercostaa"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad, saepe quam reiciendis, exercitationem omnis quia excepturi aspernatur sapiente consectetur beatae suscipit alias? Sint excepturi sapiente accusamus numquam accusantium cupiditate!"
              followers={200}
              following={200}
              gender="Masculino"
              url_img={null}
            />

            <CardProfileUsers
              name="Maria Clara"
              username="maryclarys"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad, saepe quam reiciendis, exercitationem omnis quia excepturi aspernatur sapiente consectetur beatae suscipit alias? Sint excepturi sapiente accusamus numquam accusantium cupiditate!"
              followers={200}
              following={200}
              gender="Feminino"
              url_img={null}
            />

            <CardProfileUsers
              name="Jennifer Costa"
              username="jennycos"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad, saepe quam reiciendis, exercitationem omnis quia excepturi aspernatur sapiente consectetur beatae suscipit alias? Sint excepturi sapiente accusamus numquam accusantium cupiditate!"
              followers={200}
              following={200}
              gender="Feminino"
              url_img={null}
            />

            <CardProfileUsers
              name="Luis Inácio"
              username="lula"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad, saepe quam reiciendis, exercitationem omnis quia excepturi aspernatur sapiente consectetur beatae suscipit alias? Sint excepturi sapiente accusamus numquam accusantium cupiditate!"
              followers={200}
              following={200}
              gender="Masculino"
              url_img={null}
            />

            <CardProfileUsers
              name="Luis Inácio"
              username="lula"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad, saepe quam reiciendis, exercitationem omnis quia excepturi aspernatur sapiente consectetur beatae suscipit alias? Sint excepturi sapiente accusamus numquam accusantium cupiditate!"
              followers={200}
              following={200}
              gender="Masculino"
              url_img={null}
            />
          </div>
        </TabsContent>
        <TabsContent value="tags">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
