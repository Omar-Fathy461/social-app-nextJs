import { getPosts } from "@/actions/post.action";
import getdbUserId from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getdbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : <div className="bg-white dark:bg-black dark:shadow-2xl p-4 rounded-lg shadow">Please log in to create a post</div>}
        <div className="space-y-6">
          {posts.map(post => <PostCard key={post.id} post={post} dbUserId={dbUserId} />)}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
