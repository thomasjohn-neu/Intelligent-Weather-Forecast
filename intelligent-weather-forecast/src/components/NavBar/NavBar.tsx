import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import './navbar.scss';
import { Row, Col } from 'react-bootstrap';


interface Props {
  backToHome: () => void;
  updateUnit: (selectedUnit: string) => void;
  city: string;
  selectedUnit: string;
}

export default function NavBar(props: Props) {
  const handleUnitDropdownChange: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const selectedValue = event.currentTarget.getAttribute('data-value');
    if (selectedValue) {
      props.updateUnit(selectedValue);
    }
  };

  return (
    <div>
        <Row className="navbarColor">
        <Col xs="1" lg="2" className="justify-content-md-center">
            <span className="arrowAlign navbarColor">
                {props.city.length > 0 && 
                    <FontAwesomeIcon 
                        className="arrowAlign arrowSize"
                        icon={faAnglesLeft} 
                        onClick={props.backToHome} />}
            </span>
        </Col>
        <Col xs="11" lg="8" className="justify-content-md-center">
            <h1 className="navbarColor">Intelligent Weather App</h1>
       
            {props.city.length == 0 && <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        {props.selectedUnit}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item data-value="metric" onClick={handleUnitDropdownChange}>
                                            Metric
                                        </Dropdown.Item>
                                        <Dropdown.Item data-value="standard" onClick={handleUnitDropdownChange}>
                                            Standard
                                        </Dropdown.Item>
                                        <Dropdown.Item data-value="imperial" onClick={handleUnitDropdownChange}>
                                            Imperial
                                        </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>}
        </Col>
        </Row>
      
    </div>
  );
}
