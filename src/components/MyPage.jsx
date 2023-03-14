import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../firebase'
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'
import {getStorage, uploadBytes,ref, getDownloadURL} from 'firebase/storage'
import { async } from '@firebase/util'

const MyPage = () => {
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [form, setForm] = useState({
        email:sessionStorage.getItem('email'),
        name:'무기명',
        address:'김포',
        photo:''
    });
    const {email,name,address,photo} = form;
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
    }
    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('내용수정?')) return;
        setLoading(true);
        //이미지업로드
        let url="";
        if(file !== null){//파일이 존재하면 업로드
            const fileName=`images/${Date.now()}_${file.name}`
            const result = await uploadBytes(ref(storage, fileName),file);
            url = await getDownloadURL(result.ref);
        }
        //정보수정
        await setDoc(doc(db,'users',email),{...form, photo:url})
        setLoading(false);
    }
    const getInfo = async() => {
        setLoading(true);
        const result=await getDoc(doc(db,'users', email));
        setForm(result.data());
        setImage(result.data().photo)
        setLoading(false);
    }

    useEffect(()=>{
        getInfo();
    },[])
    if(loading) return <h1>Loading...</h1>
  return (
    <Row className='justify-content-center my-5'>
        <Col md={6}>
            <Card>
                <Card.Title className='p-3 text-center'>
                    <h2>마이페이지</h2>
                </Card.Title>
                <Card.Body>
                    <Form className='text-center' onSubmit={onSubmit}>
                        <Form.Control
                        name="name" value={name} onChange={onChange}
                        placeholder='이름' className='my-3'/>
                        <Form.Control
                        name='address' value={address} onChange={onChange}
                        placeholder='주소' className='my-3'/>
                        <img src={image ? image:"http://via.placeholder.com/100x120"} style={{width:'20%'}}/>
                        <Form.Control
                            type="file" placeholder='사진' className='my-3'
                            onChange={onChangeFile}
                        />
                        <Button type='submit' className='mt-1'>정보수정</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default MyPage