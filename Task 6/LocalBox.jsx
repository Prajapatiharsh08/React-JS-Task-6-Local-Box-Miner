import React, { useState } from 'react'

export default function LocalBox() {
    const [state, setState] = useState({
        name: "",
        email: "",
        contact:"",
    })

    const [index, setIndex] = useState(null);
    const [edit, setEdit] = useState(false);

    const [data, setData] = useState(() => {
        const saveData = JSON.parse(localStorage.getItem("data"));
        return saveData || [];
    })

    function SubmitForm(e) {
        e.preventDefault();
        if (edit) {
            const updatedata = data.map((el, i) => i === index ? state : el)
            localStorage.setItem("data", JSON.stringify(updatedata));
            setData(updatedata);
            setEdit(false);
            setIndex(null);
        }
        else {
            setData((prevData) => {
                const updateDate = [...prevData, state];
                localStorage.setItem("data", JSON.stringify(updateDate));
                return updateDate
            })
        }
        setState({ name: "", email: "", contact:"" })
    }

    function Editbtn(index) {
        setState(data[index]);
        setEdit(true);
        setIndex(index)
    }

    function Deletebtn(index) {
        const del = data.filter((el, i) => index !== i);
        setData(del);
        localStorage.setItem("data", JSON.stringify(del));
    }

    return (
        <div>
            <br /><h1>Local-Box Miner </h1> <br />
            <form onSubmit={SubmitForm}>
                <label>Name : </label>
                &nbsp;&nbsp;<input type="text" placeholder='Type Name Here...' value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })} /> <br /><br />
                
                <label>Email : </label>
                &nbsp;&nbsp;<input type="text" placeholder='Type E-mail Here...' value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })} /> <br /><br />
                
                <label>Contact : </label>
                &nbsp;&nbsp;<input type="text" placeholder='Contact Number' value={state.contact}
                    onChange={(e) => setState({ ...state, contact: e.target.value })} /> <br /><br />
                <input type="submit" value={edit ? "Update Your Task" : "Add Your Task"} /><br /><br />
            </form>

            <ul style={{listStyle:"none"}}>
                {
                    data.map((el, i) => (
                        <li key={i}>
                           Name : {el.name} <br />
                           Email : {el.email}<br />
                           Contact : {el.contact}<br /><br />

                            <button onClick={() => Editbtn(i)}>Edit Task</button>&nbsp;&nbsp;
                            <button onClick={() => Deletebtn(i)}>Delete Task</button><br /><br />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
