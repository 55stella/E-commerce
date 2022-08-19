export const formatPrice = (number) => {

    const newNumber = Intl.NumberFormat('en-Us', {
        // this function formats price for differnt countries.
        // takes in two parameters, a string 'en-Us and an object'
        style: 'currency',
        currency: 'USD'
        // this is the currency code
        
    }).format((number / 100) * 600)
    // we divide the number by 100 because its been in scents and now we want to con
    //vert back to naira by dividing it by 100.
    return newNumber
}


export const getUniqueValues = (data, type) => {
    // here type can either be category, colors or company so we are returning a 
    //item[type] meaning item is an object , the type is the property so either
    // company, category or color. so map method is going to return an array of those 
    // values
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }
    // console.log(unique)
    return  ['all', ...new Set(unique)]
    

    
    // new set will convert the array into set and set will return a unique value
    // and it then empty it into the array
    
    


}
