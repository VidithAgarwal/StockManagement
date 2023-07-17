"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function Home() {
  const [productForm, setproductForm] = useState({
    productName: "",
    quantity: 0,
    price: 0,
  });

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [dropdown, setDropdown] = useState([]);

  const [products, setproducts] = useState([]);

  const [alert, setalert] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      let rjson = await response.json();
      setproducts(rjson.products);
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log("Product added successfully");
        setalert("Product added successfully");
        setproductForm({});
      } else {
        console.log("Error adding product");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);
    console.log(query);
    if (!loading) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-8 mx-auto">
        <div className="text-green-800 text-center">{alert}</div>
        <h1 className="text-3xl font-bold mb-4">Search a Product</h1>
        <div className="flex items-center">
          <input
            onChange={onDropdownEdit}
            type="text"
            className="w-full flex-1 border border-gray-300 rounded-l-md p-2"
            placeholder="Search Product"
            value={query}
          />
          <select className="border border-gray-300 rounded-r-md px-4 py-2 bg-white">
            <option value="">All</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4">
            Search
          </button>
        </div>
        {loading && <Loader />}
        <div className="dropcontainer absolute w-[73.5vw] border-1 bg-purple-100 rounded-md">
          {dropdown.map((item) => {
            return (
              <div
                key={item.productName}
                className="container flex justify-between my-1 p-2 border-b-2"
              >
                <span className="slug">
                  {item.productName} ({item.quantity} available for ₹
                  {item.price})
                </span>
                <div className="flex align-top justify-between">
                  <span className="cursor-pointer subtract py-1 px-3 inline-block text-white bg-purple-400 rounded-lg shadow-md font-semibold">
                    -
                  </span>
                  <span className="text-center quantity mx-3 w-10">
                    {item.quantity}
                  </span>
                  <span className="cursor-pointer add py-1 px-3 inline-block text-white bg-purple-400 rounded-lg shadow-md font-semibold">
                    +
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container my-8 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Add a Product</h1>
        <div className="my-4">
          <input
            value={productForm?.productName || ""}
            onChange={handleChange}
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Product Slug"
            name="productName"
          />
        </div>
        <div className="my-4">
          <input
            value={productForm?.quantity || ""}
            onChange={handleChange}
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Product Quantity"
            name="quantity"
          />
        </div>
        <div className="my-4">
          <input
            value={productForm?.price || ""}
            onChange={handleChange}
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Price"
            name="price"
          />
        </div>
        <div className="my-4">
          {/* <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={addProduct}
          >
            Add Product
          </button> */}
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md shadow-lg"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Display Current Stock</h1>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {product.productName}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.quantity}
                </td>
                <td className="border border-gray-300 p-2">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
