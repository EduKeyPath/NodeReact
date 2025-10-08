import {memo, useMemo} from "react";
import '../product/product.css';

const SimProduct = (props) => {
    return (
        <>
            {
                props.similarProducts.map((item, k) => {
                    return <div key={k} className="col-3 mb-3">
                        <div className="card p-2">
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text text-truncate">{item.des}</p>
                            </div>
                            <button onClick={() => props.goToDetails(item.id)} className="btn btn-primary">Details</button>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default memo(SimProduct);