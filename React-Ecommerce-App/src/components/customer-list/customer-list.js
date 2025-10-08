import { useState, useEffect } from 'react';
import { awaitExpression } from '@babel/types';
import API from '../../Helper/api';



export default function CustomerList(){
    const [customerList, setCustomerList] = useState([]);
    const [editedCustomer, setEditedCustomer] = useState('');
    const [isEditCustomer, setIsEditCustomer] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        getCustomerList();
    }, []);

    useEffect(() => {
        if(!!successMsg){
            const timer = setTimeout(() => {
                setSuccessMsg('');
            },2000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const getCustomerList = async () => {
        try{
            const res = await API.get("/customers");
            setCustomerList(res.data);
        }catch(err){
            console.log("Customer list error: ", err);
        }
    }

    const editCustomer = (data) => {
        setIsEditCustomer(data.id);
        setEditedCustomer(data.name);
    }

    const updateCustomer = async () => {
        try{
            const res = await API.patch(`/customer/${isEditCustomer}/name`, {name:editedCustomer});
            setCustomerList(customerList.map(item => (item.id === isEditCustomer ? {...item, name:editedCustomer}:item)));
            setIsEditCustomer(null);
            setEditedCustomer('');
        }catch(err){
            console.log('Update customer error', err);
        }
    }

    const changeStatus = async (e, customerId, customerStatus) => {
        e.preventDefault();
        customerStatus = customerStatus == 'I' ? 'A' : 'I';
        try{
            const res = await API.patch(`/customer/${customerId}/status`, {status : customerStatus});
            setCustomerList(customerList.map(item => (item.id === customerId ? {...item, status:customerStatus} : item)));
        }catch(err){
            console.log('Cutomer status change error', err);
        }
    }
    
    const deleteCustomer = async (customerId) => {
        if(window.confirm("Do you want to delete this user?")){
            try{
                const res = await API.delete(`/customer-delete/${customerId}`);
                setCustomerList(customerList.filter(item => item.id !== customerId));
                setSuccessMsg(res.data.message);
            }catch(err){
                console.log('Delete customer error', err)
            }
        }
    }

    return(
        <>
            <section className="p-5 mt-4">
                {
                    !!successMsg ? 
                    <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-success m-0" role="alert">
                            {successMsg}
                        </div>
                    </div>
                    : null
                }
                <h1 className="display-5">Customer List</h1>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !!customerList && customerList.length > 0 ? 
                                customerList.map((item, k) => {
                                    return (                        
                                        <tr key={k}>
                                            <td>{item.id}</td>
                                            <td>
                                                {
                                                    !!isEditCustomer && isEditCustomer == item.id ?
                                                    <div className="position-relative">
                                                        <input type="text" onChange={(e) => setEditedCustomer(e.target.value)} className="form-control pe-5" value={editedCustomer} />
                                                        <button onClick={updateCustomer} className="btn btn-icon position-absolute end-0 top-0 mt-1"><span className="material-icons-outlined">save</span></button>
                                                    </div>
                                                    : <>{item.name}</>
                                                }
                                            </td>
                                            <td>{item.email}</td>
                                            <td>
                                                <a href="#" onClick={(e) => changeStatus(e, item.id, item.status)} className={item.status == 'A' ? 'link-success' : item.status == 'D' ? 'link-danger' : 'link-primary'}>{item.status == 'A'?'Active' : item.status == 'D' ? 'Deleted' : 'Inactive'}</a>
                                            </td>
                                            <td>
                                                <button onClick={() => editCustomer(item)} className="btn btn-icon"><span className="material-icons-outlined">edit</span></button>
                                                <button onClick={() => deleteCustomer(item.id)} className="btn btn-icon"><span className="material-icons-outlined">delete</span></button>
                                            </td>
                                        </tr>
                                    )
                                }) 
                                : <tr><td colSpan={5}></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}