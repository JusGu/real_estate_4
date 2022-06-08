import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import axios from 'axios'

  import React, { useState } from 'react';
  const API_URL = 'https://api37.realtor.ca/Listing.svc/PropertySearch_Post';
  const params = new URLSearchParams({
      CultureId: 1,
      ApplicationId: 1,
      PropertySearchTypeId: 1,
      LongitudeMin: -79.6758985519409,
      LongitudeMax: -79.6079635620117,
      LatitudeMin: 43.57601549736786,
      LatitudeMax: 43.602250137362276,
  })

  function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [myData, setMyData] = useState([]);
    const clickHandler = e => {
        axios.post(API_URL, params)
        .Then(response => reponseHandler(response))
        .catch(error => console.log(error));
    };

    const reponseHandler = response => {
        console.log(response)
    }
    return (
        
      <div>
        <div>{count}</div>
        <button onClick={clickHandler}>
          Click me
        </button>
            <Table>
                <Tr>
                    <Th>Email</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Password</Th>
                </Tr>
                {myData.map(d => (
                    <Tr>
                        <Td>{d.email}</Td>
                        <Td>{d.firstname}</Td>
                        <Td>{d.lastname}</Td>
                        <Td>{d.password}</Td>
                    </Tr>
                )}
            </Table>
      </div>
    );
  }
export default Example;