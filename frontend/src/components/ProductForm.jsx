import { useState } from "react";
import { addProduct } from "../services/api";

function ProductForm({ onProductAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        minimum_stock: "",
        supplier: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addProduct({
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                minimum_stock: Number(formData.minimum_stock),
                supplier: formData.supplier,
            });

            setFormData({
                name: "",
                category: "",
                price: "",
                quantity: "",
                minimum_stock: "",
                supplier: "",
            });

            alert("Product added successfully!");

            onProductAdded();

        } catch (error) {
            console.error("Error adding product:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Add Product</h2>

            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
            />

            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
            />

            <input
                type="number"
                name="minimum_stock"
                placeholder="Minimum Stock"
                value={formData.minimum_stock}
                onChange={handleChange}
                min="0"
                required
            />

            <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                value={formData.supplier}
                onChange={handleChange}
            />

            <button type="submit">
                Add Product
            </button>
        </form>
    );
}

export default ProductForm;