import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createUser, getUserByID } from "../neo4j.action";

export default async function CallbackPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  // check if user is already there in neo4J : if not => create one

  const dbUser = await getUserByID(user.id);
  if (!dbUser) {
    // create user in neo4J
    await createUser({
      applicationId: user.id,
      firstname: user.given_name!,
      lastname: user.family_name ?? undefined,
      email: user.email!,
    });
  }
  return redirect("/");
}
