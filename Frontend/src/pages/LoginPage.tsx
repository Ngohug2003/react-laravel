import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const loginHandler: SubmitHandler<Inputs> = async (data) => {
        const logged = await login(data);
        if (logged) {
            navigate('/dashboard');
        } else {
            console.error("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {/* Chuyển handleSubmit(login) thành handleSubmit(loginHandler) */}
                <form onSubmit={handleSubmit(loginHandler)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email" 
                            placeholder="112@gmail.com"
                            {...register("email", { required: "Bạn phải nhập email", pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })}
                        />
                        {/* Thêm kiểm tra lỗi với thông báo tùy chỉnh */}
                        {errors.email && <span className="text-red-800">{errors.email.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            {...register("password", { required: "Bạn phải nhập mật khẩu" })}  
                        />
                        {/* Thêm kiểm tra lỗi với thông báo tùy chỉnh */}
                        {errors.password && <span className="text-red-800">{errors.password.message}</span>}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                    <p className="text-sm text-gray-700 hover:text-gray-800">
                        <a className="text-blue-700" href="/">
                            Quên mật khẩu?
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
