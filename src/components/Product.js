import React from 'react';

export default function Product(props) {
  const { element, changeSelected, changeSelectedAmount } = this.props;
  const { id, src, name, price, stock, amount } = element;
  let localBasket = JSON.parse(localStorage.getItem('Basket')) || {};

  return (
    <div className="main-container">
      <div
        className={
          localBasket.hasOwnProperty(id)
            ? 'selected-product-box'
            : 'unselected-product-box'
        }
      >
        <img
          src={src}
          alt="product"
          className="productImg"
          onClick={() => changeSelected(id)}
        />
        <p className="productName">{name}</p>
        <p className="productPrice">Price: ${price}</p>
        <p className="productStock">Stock: {stock}</p>
        <div className="productSelection">
          <button type="submit" className="addProduct">
            <i
              onClick={() => changeSelectedAmount('decrement', id)}
              className="fa-solid fa-circle-minus"
            ></i>
          </button>
          <p className="selectedProduct">{amount || 1}</p>
          <button type="submit" className="removeProduct">
            <i
              onClick={() => changeSelectedAmount('increment', id)}
              className="fa-solid fa-circle-plus"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
