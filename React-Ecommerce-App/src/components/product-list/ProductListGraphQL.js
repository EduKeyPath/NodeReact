import {useHistory} from 'react-router-dom';
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import './product.css';


const GET_PRODUCTS = gql`
    query {
        products {
            id
            image
            title
            description
            price
        }
    }
`;

export default function ProductListGraphQL() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const history = useHistory();

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const goDetails = (pId) => {
      history.push(`/product-details/${pId}`);
    }

    return (
        <section className="p-5 mt-4">
            <h1 className="display-5">Product List (GraphQL)</h1>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row product-list">
                        {
                            (!!data.products.length) ?
                            data.products.map((p) => {
                                return (
                                  <div key={p.id} className="col-3 mb-3">
                                      <div className="card p-2">
                                          <img src={p.image} className="card-img-top" alt="..." />
                                          <div className="card-body">
                                              <h5 className="card-title">{p.title}</h5>
                                              <p className="card-text text-truncate mb-0">{p.description}</p>
                                              <p className="h5 mt-2">{p.price}</p>
                                              <button className="btn btn-primary" onClick={() => goDetails(p.id)}>Details</button>
                                          </div>
                                      </div>
                                  </div>
                                )
                            })
                            : <div className="alert alert-primary text-center" role="alert">No Products</div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}