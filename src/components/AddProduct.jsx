import React, { useState } from "react";


const AddProduct = () =>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await fetch("http://localhost:5000/add-product", {
            method: 'post', 
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                "Content-Type":"application/json",    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }
        });
        const result = await response.json();
        console.warn(result);
    };

    return(
        <div className="flexColumn">
            <h1>Add Product</h1>
            <input value={name} onChange={(e) => {setName(e.target.value)}} className="inputbox" type="text" placeholder="Enter Product Name : "/>
            { error && !name && <span className="error">Enter valid name</span> }

            <input value={price} onChange={(e) => {setPrice(e.target.value)}} className="inputbox" type="text" placeholder="Enter Product Price : "/>
            { error && !price && <span className="error">Enter valid price</span> }

            <input value={category} onChange={(e) => {setCategory(e.target.value)}} className="inputbox" type="text" placeholder="Enter Product Category : "/>
            { error && !category && <span className="error">Enter valid category</span> }

            <input value={company} onChange={(e) => {setCompany(e.target.value)}} className="inputbox" type="text" placeholder="Enter Product Company : "/>
            { error && !company && <span className="error">Enter valid company</span> }

            <button onClick={addProduct} type="submit" className="btn-submit">Add Product</button>
        </div>
    )
};

export default AddProduct;