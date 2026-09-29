function ProductTable({ products, onDelete }) {
    return (
        <div className="product-table-container">
            <h2>Products</h2>

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Minimum Stock</th>
                            <th>Supplier</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>Rs. {product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.minimum_stock}</td>
                                <td>{product.supplier || "-"}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductTable;