import { useState } from "react";
import axios from "axios";

function Login({ onLogin, onGoToRegister }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            const {
                token,
                user
            } = response.data;


            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            onLogin(user);

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    Inventory Management System
                </h1>

                <h2>
                    Sign In
                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        required
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In"}

                    </button>

                </form>


                <p className="switch-auth">
                    Don't have an account?
                </p>


                <button
                    type="button"
                    className="secondary-button"
                    onClick={onGoToRegister}
                >
                    Create Account
                </button>

            </div>

        </div>
    );
}

export default Login;