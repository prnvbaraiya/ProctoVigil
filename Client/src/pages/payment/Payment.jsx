import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";
import "./payment.css"
import proctoringImage from "../../assets/Remote-proctoring.png";
import proctorFace from "../../assets/AI_image.jpg";
import { UserNavbar } from "../user/header/UserNavbar";
import Footer from "../user/footer/Footer";



const Payment = () => {
  const [totalCost, setTotalCost] = useState(0)

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: totalCost.toString(),
      currencyCode: "INR",
      countryCode: "IN",
    },
    shippingAddressRequired: false,
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
  };



  const [cartProducts, setCartProducts] = useState([])
  const [cartAddOns, setCartAddOns] = useState([])

  const addProductToCart = (value) => {
    if (cartProducts.includes(value)) {
      setCartProducts([])
      setTotalCost(totalCost - 5999)
    }
    else {
      setCartProducts(cartProducts => [...cartProducts, value]);
      setTotalCost(totalCost + 5999)
    }
  }

  const addAddOnsToCart = (value) => {
    if (cartAddOns.includes(value)) {
      setCartAddOns([])
      setTotalCost(totalCost - 1999)

    } else {
      if (cartProducts.length == 0) {
        alert('You can not get AddOns without getting any Product first.')
      }
      else {
        setCartAddOns((cartAddOns) => [...cartAddOns, value]);
        setTotalCost(totalCost + 1999)
      }
    }

  };


  return (
    <div className="container" >
      <div className="header">
        <UserNavbar />
      </div>
      <div className="product-container">
        <div className="product-list">
          <div className="products">

            <div className="card-main">
              <img
                src={proctoringImage}
                alt="Denim Jeans"
                style={{ height: "200px" }}
              />
              <h1>Online Proctorign System</h1>
              <p className="price">₹5999</p>
              <center>
                <h4 style={{ width: "80%" }}>
                  By online Proctoirng you can take exams from anywhere with
                  student being anywhere in the world. Take your exams outside of
                  just a classroom with help this product. This system will allow
                  you to add tests as and customize them as your need and proctor
                  your students from anywhere.
                </h4>
              </center>
              <div className="button">
                <button
                  onClick={() => addProductToCart("Online Proctoring System")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="add-ons">
            <div className="heading">
              <center>
                <h1>But Wait We have something More for you </h1>
                <p>
                  By purchasing Add ons you can take your your System to the
                  next level and make your experience much more pleasant.
                </p>
              </center>
            </div>
            <div className="card">
              <h3>Add Ons</h3>
              <img
                src={proctorFace}
                alt="Denim Jeans"
                style={{ height: "200px", maxWidth: '100%', borderRadius: "8px" }}
              />
              <h1>AI Analyzation</h1>
              <p className="price">₹1999</p>
              <p>
                This AI Analyzation will help you analyze candidates recordings for
                potential cheating.
              </p>
              <div className="button">
                <button onClick={() => addAddOnsToCart("AI Proctor")}>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="heading">
              <center>
                <h3>Its not over we are preparing more stuff for you </h3>
                <h3>Stay Tuned</h3>
              </center>
            </div>
          </div>
        </div>
        <div className="cart">
          <div className="cart-content">
            <h1>Cart</h1>
            <div className="added-product">
              <h3>Products</h3>
              <ul>
                {cartProducts.length != 0 &&
                  <li>
                    {
                      cartProducts.map((item, id) => {
                        return <td style={{ border: 'none' }} key={id}>{item}</td>;
                      })
                    }
                  </li>
                }
              </ul>
            </div>
            <div className="added-addons">
              <h3>Add-Ons</h3>
              <ul>
                {cartAddOns.length != 0 &&
                  <li>
                    {
                      cartAddOns.map((item, id) => {
                        return <td style={{ border: 'none' }} key={id}>{item}</td>;
                      })
                    }
                  </li>
                }
              </ul>

            </div>
            {
              totalCost > 0 && <div>
                <h4>Total Cost : {totalCost}</h4>

                <h4>Looks Good Lets checkout</h4>
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={paymentRequest}
                  buttonType="checkout"
                  onLoadPaymentData={(paymentReq) => {
                    console.log("load payment data", paymentReq);
                  }}
                  onPaymentAuthorized={(paymentData) => {
                    console.log(paymentData);
                    return {
                      transactionState: "SUCCESS",
                    };
                  }}
                ></GooglePayButton>
              </div>
            }

          </div>
        </div>
      </div>
      <div className="footer" >
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
