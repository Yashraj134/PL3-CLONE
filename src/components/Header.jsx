import axios from 'axios';
import {Link} from 'react-router-dom'
import {Button } from 'semantic-ui-react';

const Header = () => {
    const token =localStorage.getItem('token')
    const handleOnClick = async () => {
        try {
            const response = await axios.get('http://localhost:3000/contacts/download', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                responseType: 'blob', 
            });
    
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'contacts.csv');
            link.click();
        } catch (error) {
            console.error('Error downloading the CSV file:', error);
        }
    };

    const handleOnLogOut=(e)=>{
        if(localStorage.getItem('token')){
          addTasks([])
          localStorage.removeItem('token')
        }
        else alert('login..First')
      }
    
    return (
        <div className="ui menu" style={{ marginBottom: '20px' }}>
            <Link to="/"><div className="header item">
                Contact Manager
            </div></Link>
            <Link to="/"><a className="item">Contact List</a></Link>
            <Link to='/add'><a className="item">Add Contact</a></Link>
            <Link to="/signup"><a className="item">Sign-Up</a></Link>
            {token&&<a className="item" onClick={handleOnLogOut}>Log-Out</a>}
            <Button type="submit" basic color='red'  onClick={handleOnClick}>
             Download CSV
            </Button>
        </div>
    );
}

export default Header;