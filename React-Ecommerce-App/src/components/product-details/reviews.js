import React from "react";

export default function ReviewsPage(props){

    return(
        <>
            <div className="col-4">
                <div className="card px-3 py-2">
                    <div className="btn-group mb-2" role="group">
                        <button type="button" tabIndex="-1" className={`btn p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 1 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star_outline
                            </span>
                        </button>
                        <button type="button" tabIndex="-1" className={`btn p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 2 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star_outline
                            </span>
                        </button>
                        <button type="button" tabIndex="-1" className={`btn p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 3 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star_outline
                            </span>
                        </button>
                        <button type="button" tabIndex="-1" className={`btn p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 4 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star_outline
                            </span>
                        </button>
                        <button type="button" tabIndex="-1" className={`btn p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 5 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star_outline
                            </span>
                        </button>
                    </div>
                    <h3 className="display-6">{props.reviews.name}</h3>
                    <p>{props.reviews.des}</p>
                </div>
            </div>
        </>
    )
}