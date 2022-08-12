import React from 'react'
import styled from 'styled-components'

const Testing = () => {
  return (
      <Wrapper>
          <h3>Hello World</h3>
          <p>Hello people</p>
          <button>click me</button>
    </Wrapper>
  )
    
    
}

const Wrapper = styled.section`
h3{
    color: red;
}

`

export default Testing