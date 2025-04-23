import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          Login to Your Account
        </h1>
        <form className="space-y-6">
          <Input name="username" type="text" id="username" content="Username" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          <Button
            content="Login"
            type="submit"
            bgColor="bg-blue-600 hover:bg-blue-700"
          />
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
