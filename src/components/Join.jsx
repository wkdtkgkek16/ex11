import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebase'
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {getFirestore, setDoc, doc} from 'firebase/firestore'

const Join = ({history}) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email: 'user01@email.com',
        password: '12341234'
    })
    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    const {email, password} = form;
    const onSubmit = (e) => {
        e.preventDefault();
        if(!window.confirm('가입합니까?')) return;
        createUserWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            //유저정보저장
            setDoc(doc(db,'users',email),{
                email:email,
                name:'',
                address:'',
                photo:''
            })
            alert('회원가입성공');
            history.push('/login');
        })
        .catch((error)=>{
            alert('가입실패'+error.message);
        });
    }
       
    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col md={4}>
                <Card>
                    <Card.Title className='p-3 text-center'>
                        <h2>로그인</h2>
                    </Card.Title>
                    <Card.Body>
                        <Form className='mb-2' onSubmit={onSubmit}>
                            <Form.Control placeholder='✉Email' className='mb-3'
                                name="email" onChange={onChange} value={email}/>
                            <Form.Control placeholder='Password' className='mb-3'
                                type='password' value={password}
                                name="password" onChange={onChange}/>
                            <Button type="submit" variant='primary' style={{width:'100%'}}>회원가입</Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Join