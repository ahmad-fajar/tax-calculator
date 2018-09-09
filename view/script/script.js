function getAll() {
  $.ajax({
    url: 'http://localhost:3000/calc',
    method: 'GET'
  })
  .done(({data}) => {
    // console.log(data)
    let table = buildGetAllLayout(data)
    $('.right').html(table)
  })
}

function buildGetAllLayout(d) {

  let tableData = ''
  let count = 1
  let dt = d.data
  for (var i = 0; i <= dt.length - 1; i++) {
    tableData += `
    <tr class="table-secondary">
      <th scope="row">${count}</th>
      <td>${dt[i].name}</td>
      <td>${dt[i].tax_code}</td>
      <td>${dt[i].type}</td>
      <td>${dt[i].amount}</td>
      <td>${dt[i].tax_amount}</td>
      <td>${dt[i].total_amount}</td>
    </tr>
    `
    count++
  }
  

  let table = `
    <table class="table table-hover">
      <thead>
      <tr class="table-success">
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Tax Code</th>
          <th scope="col">Type</th>
          <th scope="col">Amount</th>
          <th scope="col">Tax Amount</th>
          <th scope="col">Total Amount</th>
      </tr>
      </thead>
      <tbody>
        ${tableData}
      </tbody>
      <tfoot>
        <th scope="row" colspan="4">Total</th>
        <th scope="row">${d.total_amount}</th>
        <th scope="row">${d.total_tax_amount}</th>
        <th scope="row">${d.grand_total}</th>
      </tfoot>
    </table> `

    return table
}

function getTaxTypes() {
  $.ajax({
    url: 'http://localhost:3000/type',
    method: 'GET'
  })
  .done(res => {
    let selection = buildTaxTypeSelectLayout(res)
    $('.tax-type').append(selection)
  })
}

function buildTaxTypeSelectLayout(d) {
  let selection = ''

  for (var k in d) {
    selection += `<option value="${k}">${d[k]}</option>`
  }

  return selection
}

function countTax(type, amount) {
  $.ajax({
    url: 'http://localhost:3000/calc/count',
    data: {
      amount: amount,
      type: type
    },
    method: 'GET'
  })
  .done(res => {
    showTax(res)
  })
}

function dropDownListener() {

  $(document).on('change', function() {
    if (
      $('.p-name').val() !== ''
      && $('.p-price').val() !== ''
      && !!parseInt($('.tax-type').val())
    ) {
      let tax = countTax(parseInt($('.tax-type').val()), parseInt($('.p-price').val()))
    }
  })

}

function showTax(tax) {
  $('.tax').val(tax.tax)
  $('.total').val(tax.total)
}

function saveBill() {

  $('#submit-save').on('click', function() {
    alert('Submit')
  
    if (
      $('.p-name').val() === ''
      && $('.p-price').val() === ''
      && !parseInt($('.tax-type').val())
    ) {
      alert('invalid input')
    }
  
    let data = {
      name: $('.p-name').val(),
      amount: parseInt($('.p-price').val()),
      tax_code: parseInt($('.tax-type').val())
    }
  
    $.ajax({
      url: 'http://localhost:3000/calc?multi=false',
      method: 'POST',
      data: data
    })
    .then(res => {
      getAll()
    })
    .catch(() => {})
  })

}


$(document).ready(function() {
  getAll()
  getTaxTypes()
  dropDownListener()
  saveBill()
})
