import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  console.log(stars, reviews)
        {/* span */}
      // <span>
      //   {stars > 1 ? <BsStarFill></BsStarFill>
      //     : stars >= 0.5 ? <BsStarHalf />
      //       : <BsStar />}
      // </span>
      // <span>
      //   {stars > 2 ? <BsStarFill></BsStarFill>
      //     : stars >= 1.5 ? <BsStarHalf />
      //       : <BsStar />}
      // </span>
      // <span>
      //   {stars > 3 ? <BsStarFill></BsStarFill>
      //     : stars >= 2.5 ? <BsStarHalf />
      //       : <BsStar />}
      // </span>
      // {/* end of span */}
      // <span>
      //   {stars >= 4 ? <BsStarFill></BsStarFill>
      //     : stars >= 3.5 ? <BsStarHalf />
      //       : <BsStar />}
      // </span>
      // <span>
      //   {stars ===5 ? <BsStarFill></BsStarFill>
      //     : stars >= 4.5 ? <BsStarHalf />
      //       : <BsStar />}
      // </span>
  {/* end of span */ }
  
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    // the underscore is the first parameter , since we created an empty array, the first 
    // parameter is undefined, but we are interested in the index not in the first item which 
    // is undefined. 
    return <span key ={index}>
      {stars > index + 1 ? <BsStarFill></BsStarFill>
        // here , we are using index + 1 because the index is 0 at the beginning
        // when we add 1 it becomes index + 1 which is 1. we are intereted in values 
        // from 1 to 5 that's why we are adding 1
          : stars >= number ? <BsStarHalf />
            : <BsStar />}
    </span>
  // here we used array.from to programmatically display stars. to know if stars is 
    // is greater than index + 1 meaning 1, then it renders a full star. its going
    // to check for 2, 3, 4, by looping throuh them then rendering the results accordingly.
    // so if stars is greater than one, its going to drop one review and move one, it checks for
    // two, it drops extra one and mov e to the next index untill it fninshes the iteration.

  })
  console.log(tempStars)
  return <Wrapper>
    <div className="stars">
       {tempStars}
    </div>
    <p className="reviews">
      ({reviews}customer reviews)
    </p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
