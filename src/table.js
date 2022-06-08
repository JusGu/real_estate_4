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
  import { Input } from '@chakra-ui/react'
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { Spinner } from '@chakra-ui/react'
  import { Box } from '@chakra-ui/react'

  import React, { useState } from 'react';
  const API_URL = 'https://api37.realtor.ca/Listing.svc/PropertySearch_Post';
  const params = new URLSearchParams({
      CultureId: 1,
      ApplicationId: 1,
      PropertySearchTypeId: 1,
      TransactionTypeId: 2,
      LongitudeMin: -79.6758985519409,
      LongitudeMax: -79.6079635620117,
      LatitudeMin: 43.57601549736786,
      LatitudeMax: 43.602250137362276,
      RecordsPerPage: 200
  })

  function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const myData = [];
    const [myTable, setMyTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const clickHandler = e => {
        axios.post(API_URL, params)
        .then(setLoading(false))
        .then(response => reponseHandler(response))
        .catch(error => console.log(error));
    };

    const reponseHandler = response => {
        const myResults = response.data.Results;
        console.log(response);
        for(let i = 0; i < myResults.length; i++){
            let entry = myResults[i];
            console.log(entry);
            myData.push({
                price: entry.Property.ConvertedPrice,
                address: entry.Property.Address.AddressText.replace('|', ', '),
                bathrooms: entry.Building.BathroomTotal,
                bedrooms: entry.Building.Bedrooms,
                number: entry.MlsNumber
            })
        }
        // console.log(myResults[0].Property.ConvertedPrice);
        // console.log(myResults[0].Property.Address.AddressText.replace('|', ', '));
        // console.log(myResults[0].Building.Bedrooms);
        // console.log(myResults[0].Building.BathroomTotal);
        // console.log(myResults[0].MlsNumber);

        let id = 0;
        setMyTable(myData.map(d => (
            <Tr key = {id++}>
                <Td>{d.price}</Td>
                <Td>{d.address}</Td>
                <Td>{d.bedrooms}</Td>
                <Td>{d.bathrooms}</Td>
                <Td>{d.number}</Td>
            </Tr>
        )));
        setLoading(true);
    }

    const handleInput = (type, val) => {
        console.log(type);
        console.log(val);
        params.set(type, val);
        // for(var value of params.values()) {
        //     console.log(value);
        // }
    }
    return (
        
      <div>
          <Box className="FormWrapper">
              <Box maxW='sm' borderWidth='1px' borderRadius='lg' className='Form'>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Options
                    </Box>
                <Input size = "sm" type = "number" placeholder='Minimum Longtitude' onChange = {e => handleInput('LongitudeMin', e.target.value)}/>
                <Input size = "sm" type = "number" placeholder='Maximum Longtitude' onChange = {e => handleInput('LongitudeMax', e.target.value)}/>
                <Input size = "sm" type = "number" placeholder='Minimum Latitude' onChange = {e => handleInput('LatitudeMin', e.target.value)}/>
                <Input size = "sm" type = "number" placeholder='Maximum Latitude' onChange = {e => handleInput('LatitudeMax', e.target.value)}/>
                <div className = 'buttonWrapper'>
                        <Button className='FormButton' colorScheme='blue' onClick={clickHandler}>
                            Get Results
                        </Button>
                </div>

              </Box>

          </Box>

        <TableContainer className = 'myTableContainer'>
                    <Table size = "sm">
                        <Thead>
                            <Tr>
                                <Th>Price</Th>
                                <Th>Address</Th>
                                <Th>Bedrooms</Th>
                                <Th>Bathrooms</Th>
                                <Th>MlsNumber</Th>
                            </Tr>
                        </Thead>
                        {loading? (<Tbody>{myTable}</Tbody>) : (<div className= "spinnercontainer"><Spinner thickness='3px' size='xl' speed='0.65s' emptyColor='gray.200'/></div>)}

                    </Table>
                </TableContainer>
        
      </div>
    );
  }
export default Example;