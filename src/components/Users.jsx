import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import {app} from '../firebase'
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'


const Users = () => {
    const db =getFirestore(app);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const getUsers = () => {
        setLoading(true);
        const q = query(collection(db, 'users'));
        onSnapshot(q,(result)=> {
            let rows=[];
            result.forEach((doc)=>{
                rows.push(doc.data())
            });
            setUsers(rows);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getUsers();
    },[]);

    if(loading) return <h1>Loading...</h1>
  return (
    <Row className='text-center my-5 mx-5'>
            <h1>회원목록</h1>
            {users.map(user=>
                <Card key={user.email} className="m-1">
                    <Card.Body className='user'>
                        <Row>
                            <Col>
                                <img src={user.photo} style={{width:'20%'}}/>
                            </Col>
                            <Col>
                                <div>{user.name} [{user.email}]</div>
                                <div>{user.address}</div>
                            </Col>
                        </Row>
                    </Card.Body>    
                </Card>
            )}
    </Row>
  )
}

export default Users