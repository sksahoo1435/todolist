import React, { useEffect, useState } from 'react';
import "./todolist.css";

const Todolist = () => {

    const [title, setTitle] = useState("");

    const [datas, setData] = useState([])
    const [isEdit, setEdit] = useState(false)

    const [curIndex, setIndex] = useState(null)

    useEffect(() => {

        const x = localStorage.getItem("datas")
        if (x !== null) {
            setData(JSON.parse(x))
        }

    }, [])

    const handelSubmit = (e) => {
        e.preventDefault();

        var data;

        if (title !== "") {
            data = {
                title,
            }
        } else {
            data = {
                title: datas.title
            }
        }


        if (isEdit) {

            let copy = datas
            Object.assign(copy[curIndex], data)
            setData([...copy]);
            setEdit(false);
            localStorage.setItem("datas", JSON.stringify([...copy]))
        } else {
            setData([...datas, data]);
            localStorage.setItem("datas", JSON.stringify([...datas, data]))


        }

        setTitle("")



    }

    const DeleteItem = (ele) => {
        let copy = datas.filter(item => item !== ele);
        setData([...copy]);
        localStorage.setItem("datas", JSON.stringify([...copy]))


    }

    const onEditHandler = (currentIndex) => {

        const user = datas[currentIndex];
        setIndex(currentIndex)
        setTitle(user.title);
        setEdit(true)


    }


    return (
        <>
            <div className='mainContainer'>

                <div className='todomaincontainer'>
                    <div className='header' onSubmit={handelSubmit}>
                        <div className='headertitle'>
                            <p>TODO LIST</p>
                        </div>

                        <form>
                            <div className='addSec'>

                                <div className='inputbox'>
                                    <input type='text' placeholder='Type your work here...' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <button type='submit'>{isEdit ? "UPDATE" : "ADD"}</button>

                            </div>

                        </form>
                    </div>

                    <div className='body'>

                        <div className='bodytext'>
                            <p>My Todos..</p>
                        </div>

                        <div className='todosContainer'>

                            {datas && datas.length > 0 &&
                                datas.map((ele, i) =>
                                    <div className='todos'>

                                        <div className='title'>
                                            <p>{ele.title}</p>
                                        </div>

                                        <div className='btndiv' >

                                            <div className='editclass'>
                                                <button onClick={() => onEditHandler(i)}>Edit</button>
                                            </div>

                                            <div className='deleteclass'>
                                                <button onClick={() => DeleteItem(ele)}>Delete</button>
                                            </div>


                                        </div>

                                    </div>
                                )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Todolist