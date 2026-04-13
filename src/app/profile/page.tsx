import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("auth_session")?.value;

  if (!sessionStr) {
    redirect("/login");
  }

  const user = JSON.parse(sessionStr);

  return <ProfileForm initialUser={user} />;
}
