import { useEffect, useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";

import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

import {
    getProducts,
    deleteProduct
} from "./services/api";

function App() {

    const [user, setUser] = useState(null);

    const [authPage, setAuthPage] = useState("register");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    // ===============================
    // Check existing login
    // ===============================

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");

        const token =
            localStorage.getItem("token");

        if (savedUser && token) {

            setUser(
                JSON.parse(savedUser)
            );

        }

    }, []);


    // ===============================
    // Load products
    // ===============================

    const loadProducts = async () => {

        try {

            const data =
                await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(
                "Error loading products:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (user) {

            loadProducts();

        }

    }, [user]);


    // ===============================
    // Successful registration/login
    // ===============================

    const handleAuthentication = (loggedInUser) => {

        setUser(loggedInUser);

    };


    // ===============================
    // Logout
    // ===============================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        setAuthPage("login");

    };


    // ===============================
    // Delete product
    // ===============================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await deleteProduct(id);

            loadProducts();

        } catch (error) {

            console.error(
                "Error deleting product:",
                error
            );

            alert(
                "Failed to delete product"
            );

        }

    };


    // ===============================
    // Authentication pages
    // ===============================

    if (!user) {

        if (authPage === "register") {

            return (
                <Register
                    onRegistered={
                        handleAuthentication
                    }
                    onGoToLogin={() =>
                        setAuthPage("login")
                    }
                />
            );

        }

        return (
            <Login
                onLogin={
                    handleAuthentication
                }
                onGoToRegister={() =>
                    setAuthPage("register")
                }
            />
        );

    }


    // ===============================
    // Dashboard
    // ===============================

    return (

        <div className="app">

            <header className="header">

                <h1>
                    Inventory Management System
                </h1>

                <p>
                    Welcome, {user.name}
                </p>

                <p>
                    Role: {user.role}
                </p>

                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>

            </header>


            <main className="container">

                <ProductForm
                    onProductAdded={
                        loadProducts
                    }
                />

                <section className="products-section">

                    {loading ? (

                        <p>
                            Loading products...
                        </p>

                    ) : (

                        <ProductTable
                            products={products}
                            onDelete={
                                handleDelete
                            }
                        />

                    )}

                </section>

            </main>

        </div>
    );

}

export default App;

