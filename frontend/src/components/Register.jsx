import { useState } from "react";
import axios from "axios";

function Register({ onRegistered, onGoToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            // Create account
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                    role: "staff"
                }
            );

            alert("Account created successfully!");

            // Automatically log in after registration
            const loginResponse = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            const {
                token,
                user
            } = loginResponse.data;

            // Store login information
            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Go to dashboard
            onRegistered(user);

        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Registration failed"
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
                    Create Account
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                        minLength="6"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>

                <p className="switch-auth">
                    Already have an account?
                </p>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={onGoToLogin}
                >
                    Sign In
                </button>

            </div>

        </div>
    );
}

export default Register;