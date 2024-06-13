import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedOut() {
  const { login, register } = useKindeAuth();
  return (
    <>
      <header className="bg-gray-800 shadow-md py-6">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-4xl font-bold text-white">Utilize</h1>
          <div>
            <button
              className="btn btn-ghost bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 py-2 px-4 rounded mr-4"
              onClick={login}
            >
              Sign in
            </button>
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
              onClick={register}
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to Utilize</h2>
            <p className="text-gray-700 mb-6">Please sign in to view your orders and manage your account.</p>
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
              onClick={login}
            >
              Sign in to View Orders
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>Aryan</p>
        </div>
      </footer>
    </>
  );
}
