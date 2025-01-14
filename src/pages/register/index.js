import React, { useState } from 'react'
import { Button, Card, Col, Form, Nav, Row, Spinner } from 'react-bootstrap'
import styles from './singup.module.scss'
import { signup } from './signup.service';
import { useNavigate } from 'react-router';

const Signup = () => {
    const [formData, setFormData] = useState({
        name:"",
        email: '',
        password:"",
        cnfpassword:""
      });
      const [loading,setLoading]=useState(false)
      const navigate=useNavigate();
    
      const handleChange = (e) => {
       
        const { name, value } = e.target;
        console.log(name,value)

        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // Do something with formData, like send it to an API or process it further
        console.log(JSON.stringify(formData))
        const requestOptions = {
            method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        signup(requestOptions).then(data => {
            console.log(data);
            navigate('/login')
            setLoading(false)
        })
      };
  return (
        <div className={styles.signupWrapper}>
            <div className={styles.cont}>
            <Card style={{margin:"2rem",padding:"1rem"}}
                className={styles.formStyles}
            >
              <div className={styles.heading}>
                  <div className={styles.header}>Sign UP With Email</div>
                  <div className={styles.text}>sign in / sign up with email to start chat with you're friends and family also 
                    create a group chat.</div>
              </div>

            <Form onSubmit={handleSubmit}>

            <Form.Group controlId="formName"
                className="mb-4 mt-3"
            >
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control
              type="name"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
         
          <Form.Group controlId="formEmail" className="mb-4">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
            <Form.Group className="mb-4" 
            controlId="formBasicPassword"
            >
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="password" 
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
             />
            </Form.Group>   

            <Form.Group className="mb-4" controlId="formBasicPassword">
            {/* <Form.Label>Confirm Password</Form.Label> */}
            <Form.Control type="password" 
            placeholder="Confirm Password"
            name="cnfpassword"
            value={formData.cnfpassword}
            onChange={handleChange}
             />
            </Form.Group>   
        
        <Row className="mb-2">
            <Col>
            <Button variant="secondary" type="submit" className={styles.loginBtn}>
            {loading?
                <><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
        :
        "REGISTER"}
                
            </Button>
            </Col>
        </Row>
        <div  className={styles.linkText}>
          <div className={styles.linkPlaintxt}>
            already have account 
            </div>
            <Nav>
            <Nav.Item>
                <Nav.Link onClick={()=>navigate("/login")}>
                  <div className={styles.linkHref}>Login??</div>
                </Nav.Link>
            </Nav.Item>
            </Nav>
          </div>
        </Form>
        </Card>
            </div>
        </div>
  )
}

export default Signup