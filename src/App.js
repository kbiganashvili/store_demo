import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Product from './components/Product';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem('Basket')) || {}
  );
  const [sum, setSum] = useState(0);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    let localBasket = JSON.parse(localStorage.getItem('Basket')) || {};
    let newProducts = [];

    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          if (localBasket.hasOwnProperty(item.id)) {
            item.amount = localBasket[item.id];

            setSum((oldSum) => (oldSum += item.price * item.amount));
          }

          newProducts.push(item);
        });
        setAllProducts(newProducts);
      });
  }, [inputText]);

  const changeSelectedAmount = (string, id) => {
    if (basket.hasOwnProperty(id)) {
      if (string === 'increment') {
        setAllProducts(function (oldProducts) {
          const newProducts = oldProducts.map((oldProduct) => {
            if (oldProduct.id === id) {
              if (!oldProduct.amount) {
                oldProduct.amount = 1;
              }
              if (oldProduct.amount !== oldProduct.stock) {
                oldProduct.amount = oldProduct.amount + 1;
              }
              if (basket.hasOwnProperty(id)) {
                setBasket((oldBasket) => ({
                  ...oldBasket,
                  [id]: oldProduct.amount,
                }));
                setSum((oldSum) => (oldSum += oldProduct.price));
              }
            }

            return oldProduct;
          });

          return newProducts;
        });
      } else if (string === 'decrement') {
        setAllProducts((oldProduct) => {
          const newProducts = oldProduct.map((oldProduct) => {
            if (oldProduct.id === id) {
              if (!oldProduct.amount) {
                oldProduct.amount = 1;
              }
              if (oldProduct.amount > 0) {
                oldProduct.amount = oldProduct.amount - 1;
              }
              if (oldProduct.amount === 0) {
                setBasket((oldBasket) => {
                  const currentBasket = oldBasket;
                  delete currentBasket[id];
                  return currentBasket;
                });
                setSum((oldSum) => (oldSum -= oldProduct.price));
              }

              if (basket.hasOwnProperty(id) && oldProduct.amount > 0) {
                setBasket((oldBasket) => ({
                  ...oldBasket,
                  [id]: oldProduct.amount,
                }));
                setSum((oldSum) => (oldSum -= oldProduct.price));
              }
            }

            return oldProduct;
          });

          return newProducts;
        });
      }
    }
  };

  const changeSelected = (id) => {
    setAllProducts((oldProduct) => {
      const newProducts = oldProduct.map((oldProduct) => {
        if (oldProduct.id === id) {
          if (!oldProduct.amount) {
            oldProduct.amount = 1;
          }
          if (!basket.hasOwnProperty(id)) {
            setBasket((oldBasket) => ({
              ...oldBasket,
              [id]: oldProduct.amount || 1,
            }));

            setSum(
              (oldSum) => (oldSum += oldProduct.price * oldProduct.amount)
            );
          } else if (basket.hasOwnProperty(id)) {
            setBasket((oldBasket) => {
              const currentBasket = oldBasket;
              delete currentBasket[id];
              return currentBasket;
            });
            setSum(
              (oldSum) => (oldSum -= oldProduct.price * oldProduct.amount)
            );
          }
        }

        return oldProduct;
      });
      return newProducts;
    });
  };

  const inputFunction = (event) => {
    setInputText(event.target.value);
  };

  const products = allProducts.map((element) => {
    return (
      <Product
        key={element.id}
        element={element}
        changeSelectedAmount={changeSelectedAmount}
        changeSelected={changeSelected}
      />
    );
  });

  const searchFunction = () => {
    const filteredItems = allProducts.filter((element) => {
      const productName = element.name.toLowerCase();
      const inputName = inputText.toLowerCase();
      return productName.includes(inputName);
    });

    setAllProducts(filteredItems);
  };

  localStorage.setItem('Basket', JSON.stringify(basket));

  return (
    <>
      <Header
        inpuText={inputText}
        sum={sum}
        searchFunction={() => searchFunction(inputText)}
        inputFunction={inputFunction}
      />
      <div id="products">{products}</div>
    </>
  );
}

export default App;
