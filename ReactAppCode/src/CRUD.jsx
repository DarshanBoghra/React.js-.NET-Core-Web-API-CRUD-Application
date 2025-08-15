import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {

    const empdata = [
        {
            id: 1,
            name: 'Darshan',
            age: 26,
            isActive: 1
        },
        {
            id: 2,
            name: 'Bhumi',
            age: 27,
            isActive: 1
        },
        {
            id: 3,
            name: 'Abhilasha',
            age: 25,
            isActive: 0
        }
    ]

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editId, setEditId] = useState('');
    const [modifiedName, setmodifiedName] = useState('');
    const [modifiedAge, setmodifiedAge] = useState('');
    const [modifiedisActive, setmodifiedIsActive] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get("https://localhost:7010/api/Employee")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });

    }

    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:7010/api/Employee/${id}`)
            .then((response) => {
                setmodifiedName(response.data.name);
                setmodifiedAge(response.data.age);
                setmodifiedIsActive(response.data.isActive);
                setEditId(id);
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {

            axios.delete(`https://localhost:7010/api/Employee/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        getData();
                        clear();
                        toast.success("Employee has been Deleted successfully!");
                    }

                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }

    const handleUpdate = () => {
        if (modifiedName === '' || modifiedAge === '') {
            alert("Please fill all the fields");
            return;
        }

        const url = `https://localhost:7010/api/Employee/${editId}`;
        const data = {
            "id": editId,
            "name": modifiedName,
            "age": modifiedAge,
            "isActive": modifiedisActive
        }

        axios.put(url, data)
            .then((response) => {
                handleClose();
                getData();
                clear();
                toast.success("Employee data updated successfully!");
            })
    }

    const handleSave = () => {
        if (name === '' || age === '') {
            alert("Please fill all the fields");
            return;
        }

        const url = 'https://localhost:7010/api/Employee';
        const data = {
            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post(url, data)
            .then((response) => {
                getData();
                clear();
                toast.success("Employee added successfully!");
            })

    }

    const clear = () => {
        setName('');
        setAge('');
        setIsActive(0);
        setmodifiedName('');
        setmodifiedAge('');
        setmodifiedIsActive(0);
        setEditId('');
    }

    const handleActiveChange = (e) => {
        if (e.target.checked) {
            setIsActive(1);
        }
        else {
            setIsActive(0);
        }
    }

    const handleModifiedActiveChange = (e) => {
        if (e.target.checked) {
            setmodifiedIsActive(1);
        }
        else {
            setmodifiedIsActive(0);
        }
    }


    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="checkbox" checked={isActive === 1}
                            onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                            value={isActive} />
                        <label>IsActive</label>
                    </Col>
                    <Col className="text-end">
                        <Button className="btn btn-primary" onClick={() => handleSave()}>Add Employee</Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.isActive}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter Name"
                                value={modifiedName}
                                onChange={(e) => setmodifiedName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter Age"
                                value={modifiedAge}
                                onChange={(e) => setmodifiedAge(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox" checked={modifiedisActive === 1}
                                onChange={(e) => setmodifiedIsActive(e.target.checked ? 1 : 0)}
                                value={modifiedisActive} />
                            <label>IsActive</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;