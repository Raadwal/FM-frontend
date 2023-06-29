import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import formatDate from "../hooks/formatDate";
import classes from "./css/ExpensesDisplay.module.css"

import ExpenseForm from "./Forms/ExpenseForm";
import { useParams } from "react-router-dom";


const AllExpenses = () => {
    const EXPENSES_URL = '/expenses';
    const CATEGORIES_URL = '/categories';

    const { auth } = useAuth();
    const { category } = useCategory();
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [elements, getAllElements] = useState([]);
    const [editingExpenseElement, setEditingExpenseElement] = useState(null);
    
    const getAllExpensesElements = async () => {
        const response = await axios.get(`${EXPENSES_URL}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`,
            }
        })
        getAllElements(response.data)
    }

    const modifyExpenseElement = (element) => {
        setEditingExpenseElement(element);
        setIsExpenseModalOpen(true);
    }

    useEffect(() => {
        getAllExpensesElements();
    }, []);

    const deleteElement = async (expense) => {
        try {
            await axios.delete(`${CATEGORIES_URL}/${expense.category.id}/expense/${expense.id}`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
            });
            getAllExpensesElements();
        } catch (error) {
            
        }
    }

    return (
        <div className={classes.container}>
            {isExpenseModalOpen && <ExpenseForm editingExpenseElement={editingExpenseElement} setIsExpenseModalOpen={setIsExpenseModalOpen} refreshData={getAllExpensesElements}/>}
            <div className={classes.headerSection}>
                <h1>All expenses</h1>
            </div>
            <div className={classes.infoSection}>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {elements.map((element, index) => (
                            <tr key={index}>
                                <td>{element.description}</td>
                                <td>{element.amount}</td>
                                <td>{formatDate(element.date)}</td>
                                <td> <button className={classes.modifyBtn} onClick={() => modifyExpenseElement(element)}> Modify </button> </td>
                                <td> <button className={classes.deleteBtn} onClick={() => deleteElement(element)}> Delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default AllExpenses