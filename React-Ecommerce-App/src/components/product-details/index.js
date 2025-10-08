import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactImageZoom from 'react-image-zoom';
import axios from 'axios';
import ReviewsPage from './reviews';
import './product-details.css';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, updateCart} from '../../redux/action/cartAction';

export default function ProductDetails() {
    const history = useHistory();
    let pId = useParams();
    const [reviews, setReviews] = useState([]);
    const [productList, setProductList] = useState({});
    const [productDet, setProductDet] = useState({});
    const [largeImg, setLargeImg] = useState('');
    const largeImgZoom = { zoomWidth: 500, img: largeImg };
    const [currIndx, setCurrIndx] = useState();
    const dispatch = useDispatch();
    const curCartItems = useSelector((store) => store.cartReducer.cartItems)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/data.json');
                const productList = response.data.data.product;
                setProductList(productList);
                const reviewList = response.data.data.cusReviews;
                let product = productList.find((item) => {
                    let itemId = item.id.toString();
                    let currId = pId.pId.toString();
                    return itemId === currId;
                })
                setProductDet(product);
                setLargeImg(product.image);
                setReviews(reviewList);

                let curIdx = productList.findIndex((item) => {
                    return item.id.toString() === pId.pId.toString();
                })
                setCurrIndx(curIdx);

            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, []);

    const prevProd = () => {
        let curIdx = currIndx - 1;
        setCurrIndx(curIdx);
        setProductDet(productList[curIdx])
        setLargeImg(productList[curIdx].image);
    }

    const nextProd = () => {
        let curIdx = currIndx + 1;
        setCurrIndx(curIdx);
        setProductDet(productList[curIdx])
        setLargeImg(productList[curIdx].image);
    }

    const goCart = (pd) => {
        let indx = curCartItems.findIndex(item => {
            return item.id === pd.id
        })

        if(indx > -1){
            let data = {indx, qty : curCartItems[indx].cartQty + 1};
            dispatch(updateCart(data));
        } else {
            dispatch(addToCart(pd));
        }
        history.push(`/cart/`);
    }

    return (
        <div className="p-5 mt-4">
            <h1 className="display-5">Product Details</h1>
            {productList.length - 1 === currIndx}
            <div className="product-details d-flex align-items-center">
                <button onClick={() => prevProd(productDet.id)} className={`btn btn-secondary d-inline-flex me-2 ${(currIndx === 0) ? 'disabled' : ''}`}>
                    <span className="material-icons-outlined">
                        chevron_left
                    </span>
                </button>
                <div className="card w-100 p-2">
                    {
                        (productDet.isHighDemand === 'yes') ?
                            <span className="badge rounded-pill bg-danger position-absolute high">High Demand</span>
                            : null
                    }
                    <div className="row">
                        <div className="col-5">
                            <div className="d-flex">
                                <div className="large-img me-2">
                                    {
                                        !!largeImg ?
                                            <>

                                                <ReactImageZoom {...largeImgZoom} />
                                            </>
                                            : 'Loading...'
                                    }
                                </div>
                                <div className="other-imgs">
                                    {
                                        !!productDet.otherImages ?
                                            productDet.otherImages.map((item, k) => {
                                                return <img src={item} onClick={() => setLargeImg(item)} key={k} className="img-thumbnail mb-2" alt="..." />
                                            }) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="card-body">
                                <h5 className="card-title">{productDet.name}</h5>
                                <p className="card-text">{productDet.des}</p>
                                <p><strong>Listing :</strong> {productDet.listingType}</p>
                                <p><strong>Book Type :</strong> {productDet.bookType}</p>
                                <p><strong>Grade :</strong> {productDet.grade}</p>
                                <p><strong>Qty (Instock) :</strong> {productDet.qty}</p>
                                <p className="h3 mt-2">{productDet.price}</p>

                                <button className="btn btn-primary mt-2" onClick={() => goCart(productDet)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => nextProd(productDet.id)} className={`btn btn-secondary d-inline-flex ms-2 ${(productList.length - 1 === currIndx) ? 'disabled' : ''}`}>
                    <span className="material-icons-outlined">
                        chevron_right
                    </span>
                </button>
            </div>

            <div className="customer-review">
                <h2 className="mt-5 h4 mb-2">Customer Review</h2>
                <div className="row">
                    {
                        (!!reviews.length) ?
                            reviews.map((item, k) => {
                                return (
                                    <ReviewsPage key={k} reviews={item} />
                                )
                            })
                            : <div className="alert alert-primary text-center" role="alert">No Review</div>
                    }
                </div>
            </div>

        </div>
    )
}