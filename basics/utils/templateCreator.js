const createOverviewTemplate = (template, product) => {
    const { id, productName, image, quantity, price} = product
    let htmlOutPut = template.replace('{%IMAGE%}', image)
    htmlOutPut = htmlOutPut.replace('{%IMAGE%}', image)
    htmlOutPut = htmlOutPut.replace('{%PRODUCT_NAME%}', productName)
    htmlOutPut = htmlOutPut.replace('{%QUANTITY%}', quantity)
    htmlOutPut = htmlOutPut.replace('{%IMAGE%}', image)
    htmlOutPut = htmlOutPut.replace('{%PRICE%}', price)
    htmlOutPut = htmlOutPut.replace('{%ID%}', id)
    if(!product.organic) { htmlOutPut = htmlOutPut.replace('{%NOT_ORGANIC%}', 'not-organic') }
    return htmlOutPut
}

const createProductTemplate = (template, product) => {
    const { productName, image, from, nutrients, quantity, price, organic, description} = product
    let htmlOutPut = template.replace('{%IMAGE%}', image)
    for(let i=1; i<9; i++) htmlOutPut = htmlOutPut.replace('{%IMAGE%}', image)
    htmlOutPut = htmlOutPut.replace('{%PRODUCT_NAME%}', productName)
    htmlOutPut = htmlOutPut.replace('{%FROM%}', from)
    htmlOutPut = htmlOutPut.replace('{%NUTRIENTS%}', nutrients)
    htmlOutPut = htmlOutPut.replace('{%QUANTITY%}', quantity)
    htmlOutPut = htmlOutPut.replace('{%PRICE%}', price)
    htmlOutPut = htmlOutPut.replace('{%PRICE%}', price)
    htmlOutPut = htmlOutPut.replace('{%DESCRIPTION%}', description)
    if(!organic) { htmlOutPut = htmlOutPut.replace('{%NOT_ORGANIC%}', 'not-organic') }
    return htmlOutPut
}

module.exports = {
    createOverviewTemplate,
    createProductTemplate
}