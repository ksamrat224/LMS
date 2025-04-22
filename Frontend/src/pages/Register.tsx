import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          Create an Account
        </h1>
        <form className="space-y-6">
          <Input name="name" type="text" id="name" content="Full Name" />
          <Input name="email" type="email" id="email" content="Email Address" />
          <Input name="mobile" type="tel" id="mobile" content="Mobile Number" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          <Button
            content="Register"
            type="submit"
            bgColor="bg-blue-600 hover:bg-blue-700"
          />
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;