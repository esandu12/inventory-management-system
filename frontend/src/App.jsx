import { useEffect, useState } from "react";

import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

import {
    getProducts,
    deleteProduct
} from "./services/api";

function App() {

    const [user, setUser] = useState(null);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    // ===============================
    // Check existing login
    // ===============================

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);


    // ===============================
    // Load products
    // ===============================

    const loadProducts = async () => {

        try {

            const data = await getProducts();

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
    // Login
    // ===============================

    const handleLogin = (loggedInUser) => {

        setUser(loggedInUser);

    };


    // ===============================
    // Logout
    // ===============================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

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
    // Show Login
    // ===============================

    if (!user) {

        return (
            <Login
                onLogin={handleLogin}
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
                    onProductAdded={loadProducts}
                />


                <section className="products-section">

                    {loading ? (

                        <p>
                            Loading products...
                        </p>

                    ) : (

                        <ProductTable
                            products={products}
                            onDelete={handleDelete}
                        />

                    )}

                </section>

            </main>

        </div>

    );
}

export default App;