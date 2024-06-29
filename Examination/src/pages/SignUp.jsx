import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fname,setFname] = useState("");
  const [userType,setUserType] = useState("")
  const [secretkey , setSecretkey] = useState(false)

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim(), userType});
  };
  const handleSubmit = async (e) => {

    if((userType == "Admin" || userType == "Examiner") && secretkey != "Ali" ){
      e.preventDefault();
      alert("Invalid Admin");
    }
    else{
      e.preventDefault();
      if (!formData.username || !formData.email || !formData.password) {
        return setErrorMessage('Please fill out all fields.');
      }
      try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch('/Api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          return setErrorMessage(data.message);
        }
        setLoading(false);
        if(res.ok) {
          navigate('/sign-in');
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
    
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 to-yellow-200'>
    <div className='p-6 max-w-lg w-full bg-white shadow-lg rounded-lg'>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
      <div> 
      <input type='radio' name='UserType' value="invigilator" onChange={(e)=>(setUserType(e.target.value))} /> Invigilator
     <input type='radio' name='UserType' value="Admin" onChange={(e)=>(setUserType(e.target.value))} /> Admin
    <input type='radio' name='UserType' value="Examiner" onChange={(e)=>(setUserType(e.target.value))} /> Examiner 
        </div>
        {(userType == "Admin" || userType=="Examiner") ?<div>
          <Label value='Secret Key' />
          <TextInput
            type='text'
            placeholder='secret key'
            id='user'
            onChange={(e)=>(setSecretkey(e.target.value))}
            required
            className='form-control'
          />
        </div> : null}
        
      <div>
          <Label value='Your Username' />
          <TextInput
            type='text'
            placeholder='abc01'
            id='username'
            onChange={handleChange}
            required
            className='input-field'
          />
        </div>
        <div>
          <Label value='Your email' />
          <TextInput
            type='email'
            placeholder='name@company.com'
            id='email'
            onChange={handleChange}
            required
            className='input-field'
          />
        </div>
        <div>
          <Label value='Your password' />
          <TextInput
            type='password'
            placeholder='**********'
            id='password'
            onChange={handleChange}
            required
            className='input-field'
          />
        </div>
        <Button
          className='bg-red-800 hover:bg-red-700 text-white py-2 rounded'
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
        <OAuth />
      </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span>Already have an account?</span>
        <Link to='/sign-in' className='text-blue-500 hover:underline'>
          Sign In
        </Link>
      
      </div>
      {errorMessage && (
        <Alert className='mt-5' color='failure'>
          {errorMessage}
        </Alert>
      )}

    </div>
    
  </div>
  );
}