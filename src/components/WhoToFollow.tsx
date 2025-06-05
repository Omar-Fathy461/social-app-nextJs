import { getRandomUsers } from "@/actions/user.action"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
    const users = await getRandomUsers();
    if (users.length === 0) return null;

    return <Card>
        <CardHeader>
            <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {users.map(({ id, username, image, name, _count }) => (
                    <div key={id} className="flex gap-2 items-center justify-between ">
                        <div className="flex items-center gap-1">
                            <Link href={`/profile/${username}`}>
                                <Avatar>
                                    <AvatarImage src={image ?? "/public/avatar.png"} />
                                </Avatar>
                            </Link>
                            <div className="text-xs">
                                <Link href={`/profile/${username}`} className="font-medium cursor-pointer">
                                    {name}
                                </Link>
                                <p className="text-muted-foreground">@{username}</p>
                                <p className="text-muted-foreground">{_count.followers} followers</p>
                            </div>
                        </div>
                        <FollowButton userId={id} />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
}

export default WhoToFollow
