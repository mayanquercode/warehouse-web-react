import { useNavigate } from "react-router-dom";
import { client } from "../libs/supabase/client";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = async () => {
      try {
        const { data, error } = await client.auth.getUser();
        if (error || !data.user) {
          navigate("https://mayanquercode.github.io/warehouse-web-react/login");
        }
      } catch (err) {
        console.error("Error checking user:", err);
        navigate("https://mayanquercode.github.io/warehouse-web-react/login");
      }
    };

    isUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await client.auth.signOut();
      navigate("https://mayanquercode.github.io/warehouse-web-react/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section className="p-6">
      <p className="text-6xl mb-6 text-gray-900 dark:text-white">Page Home</p>
      <button
        type="button"
        onClick={handleSignOut}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Cerrar sesión
      </button>
    </section>
  );
}

export default Home;
