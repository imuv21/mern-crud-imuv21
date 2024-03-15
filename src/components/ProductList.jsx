import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    //popup
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);


    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const gridPerPage = 5;
    const lastIndex = currentPage * gridPerPage;
    const firstIndex = lastIndex - gridPerPage;
    const grid = Array.isArray(products) ? products.slice(firstIndex, lastIndex) : [];
    const npage = Math.ceil(Array.isArray(products) ? products.length / gridPerPage : 0);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prePage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    function changePage(id) {
        setCurrentPage(id);
    }


    //soring
    const [order, setOrder] = useState("ASC");
    const soring = (col) => {
        if (order === "ASC") {
            const sorted = [...products].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setProducts(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...products].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setProducts(sorted);
            setOrder("ASC");
        }
    };




    //product list
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    };

    const showPopup = () => {
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json", authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const result = await response.json();
        console.warn(result);
        setPopupVisible(false);
    };


    return (
        <div className='flexColumn'>
            <h1>ProductList</h1>
            <div className='flexr'>
                <input className='search' onChange={searchHandle} type='text' placeholder='Filter products...' /> <button onClick={showPopup} className='add-btn'>Add Product</button>
            </div>
            <div className='flexr mb'>
                Sort By : <div onClick={() => soring("name")}>Name</div> <div onClick={() => soring("price")}>Price</div>
                <div onClick={() => soring("category")}>Category</div> <div onClick={() => soring("company")}>Company</div>
            </div>

            {isPopupVisible && (
                <div className="popup">

                    <div className='row'><button onClick={hidePopup} className='close'>Close</button></div>

                    <div className="flexColumn">
                        <h1>Add Product</h1>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} className="inputbox" type="text" placeholder="Enter Product Name : " />
                        {error && !name && <span className="error">Enter valid name</span>}

                        <input value={price} onChange={(e) => { setPrice(e.target.value) }} className="inputbox" type="text" placeholder="Enter Product Price : " />
                        {error && !price && <span className="error">Enter valid price</span>}

                        <input value={category} onChange={(e) => { setCategory(e.target.value) }} className="inputbox" type="text" placeholder="Enter Product Category : " />
                        {error && !category && <span className="error">Enter valid category</span>}

                        <input value={company} onChange={(e) => { setCompany(e.target.value) }} className="inputbox" type="text" placeholder="Enter Product Company : " />
                        {error && !company && <span className="error">Enter valid company</span>}

                        <button onClick={addProduct} type="submit" className="btn-submit">Add Product</button>
                    </div>
                </div>
            )}

            {
                grid.length > 0 ? grid.map((item, index) =>
                    <div className='grid' key={index}>
                        <div>{index + 1}</div>
                        <div>{item.name}</div>
                        <div>${item.price}</div>
                        <div>{item.category}</div>
                        <div>{item.company}</div>
                        <div><button onClick={() => deleteProduct(item._id)}>Delete</button></div>
                        <div><Link to={"/update/" + item._id}>Update</Link></div>
                    </div>
                )
                    : <h2>No result found.</h2>
            }



            <div className='pagination'>
                <div className='page-item pre'>
                    <a href='#' className='page-link' onClick={prePage}>Prev</a>
                </div>
                {
                    numbers.map((n, i) => (
                        <div className={`page-item ${currentPage === n ? 'active' : ''} `} key={i}>
                            <a href='#' className='page-link' onClick={() => changePage(n)}>{n}</a>
                        </div>
                    ))
                }
                <div className='page-item cre'>
                    <a href='#' className='page-link' onClick={nextPage}>Next</a>
                </div>
            </div>


        </div>
    )
}

export default ProductList