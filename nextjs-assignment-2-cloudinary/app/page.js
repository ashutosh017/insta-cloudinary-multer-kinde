import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SignIn from "./Signin";
export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  console.log(process.env.CLOUDINARY_URL);
  return (
    <main>
      {!user ? (
        <div>
          I am sign in page
          <SignIn />
        </div>
      ) : (
        <div>
          <h1>hello {user.given_name}</h1>
          <form
            action="http://localhost:3001/api/upload"
            method="post"
            encType="multipart/form-data"
          >
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </main>
  );
}
