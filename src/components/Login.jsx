import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Login = ({history}) => {
    const auth = getAuth(app);
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
        signInWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            alert('로그인성공')
            sessionStorage.setItem('email',email);
            history.push('/');
        })
        .catch((error)=>{
            alert("실패"+error.message);
        })
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
                            <Form.Control placeholder='✉  Email' className='mb-3'
                                name="email" onChange={onChange} value={email}/>
                            <Form.Control placeholder='🔒 Password' className='mb-3'
                                type='password' value={password}
                                name="password" onChange={onChange}/>
                            <Button type="submit" variant='primary' style={{width:'100%'}}>로그인</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Row className='text-center'>
                    <Link to='/join'><h5>회원가입</h5></Link>
                </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Login