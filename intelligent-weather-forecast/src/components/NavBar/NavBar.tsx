import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

export default function  NavBar(){ 
    return (
        <div>
            <FontAwesomeIcon icon={faAnglesLeft} />
            <h1>Dashboard</h1>
        </div>
            );
 }
