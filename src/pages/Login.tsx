import { useEffect, useState } from "react";
import { client } from "../libs/supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await client.auth.getUser();
      if (data.user) {
        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const { data, error } = await client.auth.signInWithOtp({ email });

    if (error) {
      setErrorMsg("Error al enviar el enlace. Intenta de nuevo.");
    } else {
      setSuccessMsg("Revisa tu correo para confirmar el inicio de sesión.");
    }

    console.log(data, error);
  };

  return (
    <section className="p-6">
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar enlace
        </button>
        {errorMsg && <p className="mt-3 text-red-600">{errorMsg}</p>}
        {successMsg && <p className="mt-3 text-green-600">{successMsg}</p>}
      </form>
    </section>
  );
}

export default Login;
