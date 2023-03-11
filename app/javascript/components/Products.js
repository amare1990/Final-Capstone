import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomes } from "../redux/home/Home";
import { cancelProduct } from "../redux/detail/Detail";
import { updateStatus } from "../redux/detail/Detail";
// import { updateReservationStatus } from "../redux/reservation/Reservation";
import '../styles/Products.css';

function Products() {
  const products = useSelector((state) => state.homes);
  const status = products.status;
  const cancelStatus = useSelector((state) => state.product.cancelStatus);
  const dispatch = useDispatch();
  const [successMsg, setSuccess] = useState(false);
  // const [bgImg, setBgImg] = useState('');

  // let productImg = []

  // if (products.length > 0) {
  //   products.forEach(prod => {
  //     productImg.push(prod.image)
  //   })
  // }

  // useEffect(() => {
  //   if (productImg.length > 0) {
  //     setInterval(() => {
  //       let nextImg = productImg[Math.floor(Math.random() * productImg.length)]
  //       if(nextImg === bgImg) {
  //         nextImg = productImg[Math.floor(Math.random() * productImg.length)]
  //       }
  //       setBgImg(nextImg)
  //     }, 300000)
  //   } else { setBgImg('') }
  // }, [productImg]);

  // console.log(productImg)

  useEffect(() => {
    if (cancelStatus === "fulfilled") {
      setSuccess(true);
      dispatch(fetchHomes());
      setTimeout(() => {
        setSuccess(false);
        dispatch(updateStatus(""));
      }, 1000);
    }
  }, [cancelStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  // if (status === "loading") return <div className="product"> <span class="product-loader"></span></div>

  return (
    // <div className="product-container" style={{ backgroundImage: `url(${bgImg})` }}>
    <div className="products-container">
      {(successMsg) && <p style={{ color: 'green' }}> Product canceled successfully! </p>}

      {(cancelStatus === 'rejected') && <p style={{ color: 'red' }}>Something went wrong, please try again </p>}

      {/* {(products.length === 0 && status === 'success') && <p style={{ color: 'red' }}>You have no products </p>}

      {(status === 'failed') && <p style={{ color: 'red' }}>Something went wrong, please try again </p>
      } */}
      <h2 className="products-delete-title">My Products</h2>
      {/* {(cancelStatus === 'pending') && <span class="cancel-loader"></span>} */}
      <table>
        <tr>
          <th>Product name</th>
          <th>Price</th>
          <th>description</th>
          <th>Actions</th>
        </tr>
        {products.map((product) =>
          <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{(product.description.length) > 10?(product.description.substring(0, 9)+'...'):(product.description) }</td>
            <td><button type="button" className="btn-delete-product" onClick={() => dispatch(cancelProduct(product.id))}>Delete</button></td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default Products;
